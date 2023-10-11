import nodemailer from "nodemailer";
import { connectToDatabase } from "../../db";
import getUniqueID from "@/helper/bookingId";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const client = await connectToDatabase();
  const db = client.db();
  if (req.method === "POST") {
    const {
      name,
      head,
      phoneNo: phoneno,
      pickup,
      drop,
      distance,
      pDate,
      pTime,
    } = req.body;
    const bookingId = getUniqueID();

    const newBooking = {
      name,
      head,
      phoneno,
      pickup,
      drop,
      distance,
      pDate,
      pTime,
      bookingId,
    };
    await db.collection("bookings").insertOne(newBooking);
    res.status(201).json(newBooking);
    const transporter = nodemailer.createTransport({
      port: process.env.SMTP_PORT,
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: true,
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: process.env.TO_MAIL,
      subject: "subject",
      html: `
      <p>GREETINGS from GoTravelBe</p>
        <p>Hello Charan You Have a New Cab Request</p>
        <p> ------   ----------   ------- </p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone Number:</b> ${phoneno}</p>
        <p><b>Pickup Location:</b> ${pickup}</p>
        <p><b>Drop Location:</b> ${drop}</p>
        <p><b>Distance:</b> ${distance}</p>
        <p><b>Pickup Date:</b> ${pDate}</p>
        <p><b>Pickup Time:</b> ${pTime}</p>

      `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new Error(error);
      } else {
        res.status(200).json({ data: "Email Sent" });
      }
    });
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
  