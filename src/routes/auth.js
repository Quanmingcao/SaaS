const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// Validation rules
const loginValidation = [
    check('email', 'Email không hợp lệ').isEmail(),
    check('password', 'Password phải có ít nhất 6 ký tự').isLength({ min: 6 })
];

const registerValidation = [
    check('username', 'Username là bắt buộc').not().isEmpty(),
    check('email', 'Email không hợp lệ').isEmail(),
    check('password', 'Password phải có ít nhất 6 ký tự').isLength({ min: 6 }),
    check('role', 'Role không hợp lệ').optional().isIn(['superadmin', 'admin'])
];

// Routes
router.post('/login', loginValidation, authController.login);
router.post('/register', registerValidation, authController.register);

module.exports = router;