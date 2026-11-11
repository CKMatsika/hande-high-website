<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AdmissionsApplicationController extends Controller
{
    private const DOCUMENTS = [
        'birth_certificate',
        'previous_school_report',
        'guardian_id',
        'transfer_letter',
        'passport_photo',
        'other',
    ];

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'idempotency_key' => ['required', 'uuid'],
            'entry_form' => ['required', 'in:Form 1,Form 5'],
            'student_first_name' => ['required', 'string', 'max:100'],
            'student_other_names' => ['nullable', 'string', 'max:150'],
            'student_last_name' => ['required', 'string', 'max:100'],
            'student_date_of_birth' => ['required', 'date', 'before:today'],
            'student_gender' => ['required', 'in:male,female,other'],
            'previous_school' => ['required', 'string', 'max:255'],
            'subject_combination' => ['nullable', 'string', 'max:255'],
            'residency' => ['required', 'in:day,boarding'],
            'guardian_first_name' => ['required', 'string', 'max:100'],
            'guardian_last_name' => ['required', 'string', 'max:100'],
            'guardian_relationship' => ['required', 'string', 'max:100'],
            'guardian_phone' => ['required', 'string', 'max:50'],
            'guardian_email' => ['nullable', 'email', 'max:255'],
            'guardian_alternate_phone' => ['nullable', 'string', 'max:50'],
            'guardian_address' => ['required', 'string', 'max:1000'],
            'birth_certificate_number' => ['nullable', 'string', 'max:100'],
            'documents.birth_certificate' => ['required', 'file', 'mimes:pdf,doc,docx,jpg,jpeg,png', 'max:10240'],
            'documents.previous_school_report' => ['required', 'file', 'mimes:pdf,doc,docx,jpg,jpeg,png', 'max:10240'],
            ...collect(self::DOCUMENTS)
                ->reject(fn (string $category) => in_array($category, ['birth_certificate', 'previous_school_report'], true))
                ->mapWithKeys(fn (string $category) => [
                    "documents.$category" => ['nullable', 'file', 'mimes:pdf,doc,docx,jpg,jpeg,png', 'max:10240'],
                ])->all(),
        ]);

        if (! filled(config('services.hande_erp.admissions_token'))) {
            return response()->json([
                'message' => 'The admissions service is not configured yet. Please contact the school.',
            ], 503);
        }

        $fields = collect($data)
            ->except(['documents'])
            ->map(fn ($value) => $value ?? '')
            ->all();
        $fields['academic_year'] = '2027';

        $pendingRequest = Http::acceptJson()
            ->withToken(config('services.hande_erp.admissions_token'))
            ->timeout(45);

        foreach (self::DOCUMENTS as $category) {
            $file = $request->file("documents.$category");
            if ($file) {
                $pendingRequest = $pendingRequest->attach(
                    "documents[$category]",
                    fopen($file->getRealPath(), 'r'),
                    $file->getClientOriginalName(),
                );
            }
        }

        try {
            $response = $pendingRequest->post(config('services.hande_erp.admissions_url'), $fields);
        } catch (ConnectionException) {
            return response()->json([
                'message' => 'The admissions service could not be reached. Your application was not confirmed; please retry shortly using the same form.',
            ], 503);
        }

        if ($response->status() === 201) {
            $body = $response->json() ?? [];
            $applicationNumber = data_get($body, 'application_number')
                ?? data_get($body, 'data.application_number');

            return response()->json([
                'message' => data_get($body, 'message', 'Your application has been submitted for review.'),
                'application_number' => $applicationNumber,
            ], 201);
        }

        if ($response->status() === 422) {
            $body = $response->json() ?? [];
            return response()->json([
                'message' => data_get($body, 'message', 'Please check the application details and uploaded files.'),
                'errors' => data_get($body, 'errors', []),
            ], 422);
        }

        if (in_array($response->status(), [401, 403], true)) {
            return response()->json([
                'message' => 'The admissions service rejected the website credentials. Please contact the school; your application was not submitted.',
            ], $response->status());
        }

        if ($response->status() === 429) {
            return response()->json([
                'message' => 'The admissions service is receiving too many applications. Please wait a moment and retry this form.',
            ], 429);
        }

        return response()->json([
            'message' => 'The admissions service is temporarily unavailable. Your application was not confirmed; please retry shortly using the same form.',
        ], 503);
    }
}
