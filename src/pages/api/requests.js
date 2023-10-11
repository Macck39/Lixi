import { connectToDatabase } from "../../db";
import jwt from 'jsonwebtoken';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const key = process.env.JWT_SECRETKEY;

export default async function handler(req, res) {
 
  if (req.method === "GET") {
    const token = req.cookies.authToken;
    if (token){
      try {
        const client = await connectToDatabase();
        const db = client.db();
        const decoded = jwt.verify(token,key);
        const username = decoded.username;
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ username });
        if(user){
          const requests = await db.collection("bookings").find().toArray();
          res.status(200).json(requests);
        }else{
          res.status(403).json({ message: 'User Not found, Unauthorized' });
        }
      } catch (error) {
        res.status(403).json({ message: 'Token Invalid, Uauthorized' });
      }
    }else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
