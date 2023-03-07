export const validator = (schema) => (payload) => {
    const result = schema.validate(payload, { abortEarly: false });
    return result.error ? {error: result.error.details[0].message} : payload;
}