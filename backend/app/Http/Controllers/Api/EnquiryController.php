<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EnquiryController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $isAdmission = $request->input('type') === 'admission';

        $data = $request->validate([
            'type' => ['nullable', 'in:contact,admission'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'applicant_name' => [$isAdmission ? 'required' : 'nullable', 'string', 'max:255'],
            'entry_year' => ['nullable', 'string', 'max:20'],
            'message' => ['required', 'string', 'max:5000'],
            'consent' => [$isAdmission ? 'accepted' : 'nullable'],
            'honeypot' => ['nullable', 'size:0'],
        ], [
            'applicant_name.required' => 'Please provide the learner\'s name.',
            'consent.accepted' => 'Please confirm the declaration before submitting.',
            'honeypot.size' => 'Submission rejected.',
        ]);

        unset($data['consent'], $data['honeypot']);

        $data['type'] ??= 'contact';

        $enquiry = Enquiry::create($data);

        return response()->json([
            'message' => 'Thank you. Your enquiry has been received and the school will respond shortly.',
            'data' => ['id' => $enquiry->id],
        ], 201);
    }
}
