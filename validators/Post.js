import { body } from 'express-validator'

export const postValidation = [
    body('name', 'Имя должно быть минимум из двух символов').isLength({min: 2, max: 64}).isString(),
    body('comment', 'Пароль должен быть минимум из пяти символов').isLength({min: 5, max: 256}).isString(),
]