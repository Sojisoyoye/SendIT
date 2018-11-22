const Validator = require('validatorjs');

const LogInValid = (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const rules = {
    email: 'required|email',
    password: 'required',
  };
  const myValidation = new Validator(user, rules);
  if (myValidation.passes()) {
    return next();
  }
  return res.send('enter a valid email and password');
};

export default LogInValid;
