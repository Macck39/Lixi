import nodemailer from "nodemailer";
import { connectToDatabase } from "../../db";
import { Booking } from "@/models/booking";
import getUniqueID from "@/helper/bookingId";




//post request for adding the booking details
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
        const currentDateTime = new Date();
        const formattedDate = `${currentDateTime.getDate().toString().padStart(2, '0')}-${(currentDateTime.getMonth() + 1).toString().padStart(2, '0')}-${currentDateTime.getFullYear().toString().slice(-2)}`;
        const formattedTime = `${currentDateTime.getHours().toString().padStart(2, '0')}:${currentDateTime.getMinutes().toString().padStart(2, '0')}:${currentDateTime.getSeconds().toString().padStart(2, '0')}`;
        try {
            const bookingId = getUniqueID();
           
            const newBooking = {
                head,
                name,
                phoneno,
                pickup,
                drop,
                distance,
                pDate,
                pTime,
                bookingId,
                date: `${formattedDate}`,
                time:`${formattedTime}`,
            };
            // const newBooking = await booking.save();
            await db.collection("bookings").insertOne(newBooking);
            await sendMail(newBooking);
            return res.status(201).json(newBooking);
        } catch (error) {
            console.log(error, "err")
            return res.status(500).json({ error: 'An error occurred while processing your booking.' });

        }

    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const sendMail = async (data) => {
    try {
        const transporter = nodemailer.createTransport({
            port: process.env.SMTP_PORT,
            host: process.env.SMTP_HOST,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
            secure: true,
            debug: true,
        });
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: process.env.TO_MAIL,
            subject: "subject",
            html: `
      <p>GREETINGS from GoTravelBe</p>
        <p>Hello Charan You Have a New Cab Request</p>
        <p> ------   ----------   ------- </p>
        <p><b> ${data.head}</b></p>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Phone Number:</b> ${data.phoneno}</p>
        <p><b>Pickup Location:</b> ${data.pickup}</p>
        <p><b>Drop Location:</b> ${data.drop}</p>
        <p><b>Distance:</b> ${data.distance}</p>
        <p><b>Pickup Date:</b> ${data.pDate}</p>
        <p><b>Pickup Time:</b> ${data.pTime}</p>

      `,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                // console.log(error,"error")
                throw new Error(error);
            } else {
                return res.status(200).json({ message: "Mail sent" })
            }
        });
    } catch (error) {
        return res.status(500).json({ error: " Error sending mail" })
    }
}