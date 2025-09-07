// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { firstName, lastName, email, phone, vehicleMake, vehicleModel, vehicleYear, vehicleColor, date, timeSlot } = body;

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Confirmation email to client
//     await transporter.sendMail({
//       from: `"Detail Drive Shine" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Booking Confirmation - Detail Drive Shine",
//       html: `
//         <h2>Thank you for booking, ${firstName} ${lastName} !</h2>
//         <p><strong>Address:</strong> ${body.address}</p>
//         <p>Your appointment has been scheduled.</p>
//         <p><strong>Date:</strong> ${date}</p>
//         <p><strong>Time:</strong> ${timeSlot}</p>
//         <p><strong>Services:</strong> ${body.selectedServices.map((service: any) => service.name).join(", ")}</p>
//         <p><strong>Vehicle:</strong> ${vehicleYear} ${vehicleMake} ${vehicleModel} (${vehicleColor})</p>
//         <p>We look forward to serving you!</p>
//       `,
//     });

//     // Notification email to admin
//     await transporter.sendMail({
//       from: `"Booking System" <${process.env.EMAIL_USER}>`,
//       to: "nomanirshad0324@gmail.com", 
//       subject: `New Booking from ${firstName} ${lastName}`,
//       html: `
//         <h2>New Booking Received</h2>
//         <p><strong>Name:</strong> ${firstName} ${lastName}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone}</p>
//         <p><strong>Address:</strong> ${body.address}</p>
//         <p><strong>Date:</strong> ${date}</p>         
//         <p><strong>Time:</strong> ${timeSlot}</p>
//         <p><strong>Vehicle:</strong> ${vehicleYear} ${vehicleMake} ${vehicleModel} (${vehicleColor})</p>
//         <p><strong>Selected Services:</strong> ${body.selectedServices.join(", ")}</p>
//         <p><strong>Additional Services:</strong> ${body.additionalServices.join(", ")}</p>
//         <p><strong>Notes:</strong> ${body.notes}</p>
//         <p><strong>Total Price:</strong> ${body.totalPrice}</p>


//       `,
//     });

//     return NextResponse.json({ message: "Emails sent successfully" });
//   } catch (error: any) {
//     console.error("Email error:", error);
//     return NextResponse.json({ message: "Failed to send emails", error: error.message }, { status: 500 });
//   }
// }


// app/api/send/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getAdminEmailTemplate, getUserEmailTemplate } from "@/utils/email";

const resend = new Resend(process.env.RESEND_EMAIL_SECRET_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Ensure date is a Date or ISO string acceptable to date-fns
    if (body.date) {
      body.date = new Date(body.date).toISOString();
    }

    const from = process.env.FROM_EMAIL || "onboarding@resend.dev";
    const admin = process.env.ADMIN_EMAIL || "abduljawed6663@gmail.com ";

    const userPromise = resend.emails.send({
      from,
      to: body.email,
      subject: "✅ Booking Confirmation - Decent Auto Detailing",
      html: getUserEmailTemplate(body),
    });

    const adminPromise = resend.emails.send({
      from,
      to: admin,
      subject: `📩 New Booking - ${body.firstName} ${body.lastName}`,
      html: getAdminEmailTemplate(body),
    });

    const results = await Promise.all([userPromise, adminPromise]);

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error("Resend send error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

