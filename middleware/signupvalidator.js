const Validator = require('validatorjs');

const SignUpValid = (req, res, next) => {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.passwprd,
    isadmin: req.body.isadmin,
  };

  const rules = {
    firstname: 'required|alpha',
    lastname: 'required|alpha',
    email: 'required|email',
    phone: 'required|integer',
    password: 'required',
    isadmin: 'required|boolean',
  };

  const myValidation = new Validator(user, rules);
  if (myValidation.passes()) {
    return next();
  }
  return res.send('please provide a valid input');
};

export default SignUpValid;
