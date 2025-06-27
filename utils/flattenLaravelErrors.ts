export const flattenErrors = (errorsObj: Record<string, string[]>): string[] => {
    if (!errorsObj || typeof errorsObj !== "object") return [];
    return Object.values(errorsObj).flat();
};

