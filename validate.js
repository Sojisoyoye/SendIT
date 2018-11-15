const { check } = require('express-validator/check');

module.exports = {
  validatePostInputs: [
    check('userid')
      .isLength({ min: 5 }).withMessage('invalid userid')
      .isAlphanumeric()
      .withMessage('invalid format'),

    check('sendername')
      .isLength({ min: 3 }).withMessage('Enter valid name')
      .isAlpha()
      .withMessage('name should only contain letters'),

    check('receivername')
      .isLength({ min: 3 })
      .isAlpha(),

    check('pickuplocation')
      .isLength({ min: 2 })
      .isAlphanumeric(),

    check('destination')
      .isLength({ min: 2 })
      .isAlphanumeric(),

    check('packagecontent')
      .isAlpha(),

    check('weight')
      .isLength({ min: 3, max: 8 })
      .isAlphanumeric(),

    check('price')
      .isLength({ min: 3, max: 8 })
      .isAlphanumeric(),
  ],
  errorFormatter: ({
    location, msg, param, value, nestedErrors,
  }) => ({
    type: 'Error',
    name: 'Input Failure',
    location,
    message: msg,
    param,
    value,
    nestedErrors,
  }),
};
