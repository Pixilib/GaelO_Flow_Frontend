
/**
 * Get the query parameters from the URL
 * @returns {Record<string, string>} - The query parameters from the URL
 * @example
 * URL: http://localhost:3000/change-password?token=123&userId=1
 * const queryParams = getQueryParams();
 * const { token, userId } = queryParams;
 */
export function getQueryParams(): Record<string, string> {
    const params = new URLSearchParams(window.location.search);
    const result: Record<string, string> = {};

    for (const key of params.keys()) {
        const value = params.get(key);
        if (value) {
            result[key] = value;
        } else {
            console.error(`The key "${key}" is missing in the URL.`);
        }
    }

    return result;
}
