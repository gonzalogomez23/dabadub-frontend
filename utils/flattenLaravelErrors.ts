export const flattenErrors = (errorsObj: Record<string, string[]>): Record<string, string> => {
    if (!errorsObj || typeof errorsObj !== "object") return {};
    const flatErrors: Record<string, string> = {};
    for (const [key, value] of Object.entries(errorsObj)) {
        flatErrors[key] = value[0]; // toma solo el primer error de cada campo
    }
    return flatErrors;
};

// Custom error class to handle API errors with flat errors
export class APIError extends Error {
    flatErrors: Record<string, string>;

    constructor(message: string, flatErrors: Record<string, string> = {}) {
        super(message);
        this.name = "APIError";
        this.flatErrors = flatErrors;
    }
}


