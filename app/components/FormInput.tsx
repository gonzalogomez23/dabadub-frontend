'use client'

import React from 'react';

type FormInputProps = {
    label?: string
    id?: string
    type?: string  // opcional, solo para input
    as?: 'input' | 'textarea'
    name: string
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    required?: boolean
    autoComplete?: string
    disabled?: boolean
    className?: string
    error?: string | null
}

const FormInput = ({
    label,
    type = 'text',
    as = 'input',
    name,
    placeholder,
    value,
    onChange,
    required = false,
    autoComplete = "off",
    disabled = false,
    className = "",
    error = null,
}: FormInputProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor={name} hidden={!label}>{label}</label>
            {as === 'textarea' ? (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    rows={4}
                    className={`bg-zinc-50/40 min-w-72 w-full border-2 border-border1 rounded-lg px-4 py-2 focus:outline-secondary ${error ? 'border-red-700' : ''} ${className}`}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    autoComplete={autoComplete}
                    disabled={disabled}
                    className={`bg-zinc-50/40 min-w-72 w-full border-2 border-border1 rounded-lg px-4 py-2 focus:outline-secondary ${error ? 'border-red-700' : ''} ${className}`}
                />
            )}
            {error && (
                <p className="text-red-700 mt-2">{error}</p>
            )}
        </div>
    )
}

export default FormInput
