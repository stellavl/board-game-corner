import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import { buildCustomerReservationEmailHtml } from "../utils/reservation-email-html.js";

dotenv.config({ path: '../.env' });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  const msg = {
    to,
    from: process.env.SENDGRID_SENDER, 
    subject,
    html,
  };
  return sgMail.send(msg);
};

export function buildCustomerNewReservationEmail(reservation) {
  return {
    to: reservation.customer_email,
    subject: "Νέα Κράτηση στο Board Game Corner!",
    html: buildCustomerReservationEmailHtml(reservation, "Σε επεξεργασία")
  };
}

export function buildCustomerReservationUpdatedStatusEmail(reservation, status) {
  return {
    to: reservation.customer_email,
    subject: "Ενημέρωση κατάστασης κράτησης στο Board Game Corner",
    html: buildCustomerReservationEmailHtml(reservation, status)
  };
}

export default sendEmail;