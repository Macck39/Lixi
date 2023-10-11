export default async (req, res) => {
    if (req.method === 'POST') {
      // Clear the authToken cookie by setting an expired value
      res.setHeader('Set-Cookie', 'authToken=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
  
      res.status(200).json({ message: 'Logged out successfully' });
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
  