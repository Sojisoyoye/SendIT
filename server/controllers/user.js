import models from '../models';
import Helper from '../helper/helper';

const { User } = models;

const handleError = (err, res, code, value, Emsg, Umsg) => {
  const { errors } = err;
  const errResult = errors.filter(obj => obj.path === value)[0];
  if (errResult) {
    res.status(code).json({
      status: code,
      message: Emsg
    });
  } else {
    res.status(code).json({
      status: code,
      message: Umsg
    });
  }
};

const handleResponse = (res, code, msg) => {
  res.status(code).json({
    status: code,
    message: msg,
  });
};

const UserController = {
  async create(req, res) {
    const hashPassword = Helper.hashPassword(req.body.password);

    const values = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      othernames: req.body.othernames,
      email: req.body.email,
      username: req.body.username,
      password: hashPassword,
    };

    try {
      const user = await User.create(values);
      const token = Helper.generateToken(user.id);
      return res.status(200).json({
        status: 201,
        message: 'User created successfully',
        token,
        user,
      });
    } catch (err) {
      handleError(err, res, '406', 'email', 'Email already in use', 'Username already in use');
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return handleResponse(res, 400, 'User not found/Email not available in database');
      }
      if (!Helper.comparePassword(user.password, password)) {
        return handleResponse(res, 400, 'Incorrect password');
      }

      const token = Helper.generateToken(user.id);
      return res.status(200).json({
        status: 200,
        message: 'Login successful',
        token,
      });
    } catch (error) {
      handleResponse(res, 400, error);
    }
  }
};


export default UserController;
