import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface FieldWrapperProps {
  label: string
  htmlFor: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

export function FieldWrapper({ label, htmlFor, error, required, children }: FieldWrapperProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-brand-800">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-red-600">
            *
          </span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p role="alert" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

const control =
  'w-full border border-brand-300 bg-white px-3.5 py-2.5 text-brand-900 placeholder:text-brand-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-300'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  error?: string
}

export function TextField({ label, id, error, required, ...props }: TextFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id} error={error} required={required}>
      <input
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        className={control}
        {...props}
      />
    </FieldWrapper>
  )
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  id: string
  error?: string
}

export function TextAreaField({ label, id, error, required, ...props }: TextAreaFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id} error={error} required={required}>
      <textarea
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        className={`${control} min-h-32`}
        {...props}
      />
    </FieldWrapper>
  )
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  id: string
  error?: string
  options: { value: string; label: string }[]
}

export function SelectField({ label, id, error, required, options, ...props }: SelectFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id} error={error} required={required}>
      <select id={id} required={required} aria-invalid={Boolean(error)} className={control} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  )
}
