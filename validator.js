const { body } = require("express-validator")
console.log(body)

const isFieldEmpty = (field) => {
    return body(field)
           .not()
           .isEmpty()
           .withMessage(`user ${field} is required`)
           .bail()
           .trim()
}
const validateUserName = () => {
    return isFieldEmpty("name")
           .isLength({ min: 2, max: 20 })
           .withMessage("user name length must be between 2~20 characters")
}
const validateUserEmail = () => {
    return isFieldEmpty("email")
           .isEmail()
           .withMessage("user email is not valid")
}
const validateUserPassword = () => {
    return isFieldEmpty("password")
           .isLength({ min: 7 })
           .withMessage("password must be more than 7 characters")
           .bail()
           .isLength({ max: 15 })
           .withMessage("password must be lesser than 15 characters")
           .bail()
           .matches(/[A-Za-z]/)
           .withMessage("password must be at least 1 alphabet")
           .matches(/[0-9]/)
           .withMessage("password must be at least 1 number")
           .matches(/[!@#$%^&*]/)
           .withMessage("password must be at least 1 special character")
           .bail()
           .custom((value, { req }) => req.body.confirmPassword === value)
           .withMessage("Password don't match.")
}
const validateTodoTitle = () => {
    return isFieldEmpty('title')
           .isLength({ min: 2, max: 20 })
           .withMessage("todo title length must be between 2~20 characters")
}
const validateTodoDescription = () => {
    return isFieldEmpty('description')
           .isLength({ min: 5, max: 100 }) 
           .withMessage("todo description length must be between 5~100 characters")
}
const validateTodoCategory = () => {
    return isFieldEmpty('category')
           .isIn(['오락', '공부', '음식', '자기계발', '업무', '패션', '여행'])
           .withMessage('todo category must be one of 오락 | 공부 | 음식 | 자기계발 | 업무 | 패션 | 여행')
}

module.exports = {
    validateUserName,
    validateUserEmail,
    validateUserPassword,
    validateTodoTitle,
    validateTodoDescription,
    validateTodoCategory
}