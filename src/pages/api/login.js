import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../db';
import cookie from 'cookie';

const key = process.env.JWT_SECRETKEY;

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    try {
      const client = await connectToDatabase();
      const db = client.db();

      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ username });
      if (user && bcrypt.compareSync(password, user.password)) {
        // console.log(username, "username")
        const token = jwt.sign({ username }, key);
        // console.log(token,user.password, "token")
        res.setHeader('Set-Cookie', cookie.serialize('authToken', token, {
          httpOnly: true,
          secure: process.env.RUNTIME !== "development",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7,
          path: "/"
        }));
        res.status(200).json({ message: 'Admin logged in successfully' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
