'use client'

type FormInputProps = {
    type: string
    name: string
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    required?: boolean
    autoComplete?: string
    disabled?: boolean
    className?: string
    error?: string | null 
}

const FormInput = ({
    type,
    name,
    placeholder,
    value,
    onChange,
    required = false,
    autoComplete = "off",
    disabled = false,
    className = "",
    error = null
}: FormInputProps) => {
    return (
        <div>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                autoComplete={autoComplete}
                disabled={disabled}
                className={`bg-zinc-50/40 w-96 max-w-full border border-border1 rounded-lg px-4 py-2 focus:outline-secondary ${error ? 'border-red-700' : ''} ${className}`}
            />
            {error && (
                <p className="text-red-700 mt-2">{error}</p>
            )}
        </div>
    )
}

export default FormInput