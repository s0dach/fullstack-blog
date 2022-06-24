import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неправильная почта").isEmail(),
  body("password", "Пароль содержит меньше 5 символов").isLength({ min: 5 }),
];
export const registerValidation = [
  body("email", "Неправильная почта").isEmail(),
  body("password", "Пароль содержит меньше 5 символов").isLength({ min: 5 }),
  body("fullName", "Имя содержит меньше 2 символов").isLength({ min: 2 }),
  body("avatarUrl", "Нет ссылки Картинки").optional().isURL(),
];
export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 5 }).isString(),
  body("text", "Введите текс").isLength({ min: 5 }).isString(),
  body("tags", "Введите теги(массив)").optional().isArray(),
  body("imageUrl", "Нет ссылки Картинки").optional().isString(),
];
