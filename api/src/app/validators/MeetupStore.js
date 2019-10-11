import { object, string, date, number } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      title: string()
        .strict(true)
        .required(),
      description: string()
        .strict(true)
        .required(),
      location: string()
        .strict(true)
        .required(),
      date: date().required(),
      banner_id: number().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: { message: 'Validations failures' } });
  }
};
