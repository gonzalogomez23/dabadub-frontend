'use client'

import { PostCategory } from "../types"

type FormSelectProps = {
    label?: string
    name: string
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: PostCategory[]
    required?: boolean
    disabled?: boolean
    className?: string
    error?: string | null
}

const FormSelect = ({
    label,
    name,
    value,
    onChange,
    options,
    required = false,
    disabled = false,
    className = "",
    error = null
}: FormSelectProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor={name} hidden={!label}>{label}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`bg-zinc-50/40 min-w-72 w-full border-2 border-border1 rounded-lg px-4 py-2 focus:outline-secondary ${error ? 'border-red-700' : ''} ${className}`}
            >
                <option value="0">None</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.title}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-red-700 mt-2">{error}</p>
            )}
        </div>
    )
}

export default FormSelect
