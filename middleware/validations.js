const Validator = require('validatorjs');

const isValid = (req, res, next) => {
  const parcel = {
    userid: req.body.userid,
    sendername: req.body.sendername,
    receivername: req.body.receivername,
    pickuplocation: req.body.pickuplocation,
    destination: req.body.destination,
    packagecontent: req.body.packagecontent,
    weight: req.body.weight,
    price: req.body.price,
  };

  const rules = {
    userid: 'alpha_num',
    sendername: 'alpha',
    receivername: 'alpha',
    pickuplocation: 'alpha',
    destination: 'alpha',
    packagecontent: 'alpha',
    weight: 'alpha_num',
    price: 'alpha_num',
  };

  const myValidation = new Validator(parcel, rules);
  if (myValidation.passes()) {
    console.log(myValidation.passes);
    return next();
  }
  return res.send('invalid input');
};

export default isValid;


// myValidation.passes();
// myValidation.fails();
