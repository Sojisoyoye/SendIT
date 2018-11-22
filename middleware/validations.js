const Validator = require('validatorjs');

const isValid = (req, res, next) => {
  const parcel = {
    userid: req.body.userid,
    pickuplocation: req.body.pickuplocation,
    destination: req.body.destination,
    currentlocation: req.body.currentlocation,
    status: req.body.status,
    weight: req.body.weight,
  };

  const rules = {
    userid: 'alpha_num',
    pickuplocation: 'required|alpha',
    destination: 'required|alpha',
    currentlocation: 'alpha',
    status: 'alpha',
    weight: 'alpha_num',
  };

  const myValidation = new Validator(parcel, rules);
  if (myValidation.passes()) {
    console.log(myValidation.passes);
    return next();
  }
  return res.send('please enter valid inputs');
};

export default isValid;
