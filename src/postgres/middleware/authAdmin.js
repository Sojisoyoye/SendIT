import jwt from 'jsonwebtoken';
import db from '../db';

const authAdmin = {
  async verifyAdmin(req, res, next) {
    const token = req.headers['x-access-token'];
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if (!rows[0].isadmin) {
        return res.status(403).json({
          message: 'access denied! You are not authorized to access this content'
        });
      }
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default authAdmin;
