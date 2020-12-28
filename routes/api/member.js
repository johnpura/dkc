const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const controller = require('../../controllers/MemberController');

// contraints to sanitize form data
const sanitizeForm = [
  body('email')
    .not().isEmpty()
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape(),
  body('text')
    .not().isEmpty()
    .trim()
    .escape(),
];

router.post('/register', controller.register);
router.post('/auth', controller.auth);
//router.get('/:id', controller.show);
//router.put('/:id', controller.update);
//router.delete('/:id', controller.remove);

module.exports = router;
