export const validator = (schema) => (payload) => {
  const result = schema.validate(payload, { abortEarly: false });
  return result.error ? { error: result.error.details[0].message } : payload;
};

export function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(422).send(error.details.map((e) => e.message));
    }
    next();
  };
}
