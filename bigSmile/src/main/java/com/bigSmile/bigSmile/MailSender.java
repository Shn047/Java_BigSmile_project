package com.bigSmile.bigSmile;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;

import java.util.Properties;

public class MailSender {
    public static void sendMail(String to, String from, String patientName, String doctorName, String time) {
//        boolean flag = false;
        Properties properties= new Properties();
        //Object put(Object key,Object value)
        properties.put("mail.smtp.auth",true);
        properties.put("mail.smtp.starttls.enable",true);
        properties.put("mail.smtp.port","587");
        properties.put("mail.smtp.host","smtp.gmail.com");

        String username = "swanhtetnaing047.mdy";
        String password = "setebnsxxdngmrnd";
        //To authenticate
        Session session = Session.getDefaultInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username,password);
            }
        });

        try{
            Message message = new MimeMessage(session);
            message.setRecipient(Message.RecipientType.TO,new InternetAddress(to));
            message.setFrom(new InternetAddress(from));
            String subject = "Clinic Booking Confirmation";
            message.setSubject(subject);

            MimeBodyPart part1 = new MimeBodyPart();
            String text = "Dear "+ patientName +
                    "\n" +
                    "We are writing to confirm your upcoming appointment at our clinic. Your appointment has been scheduled at " + time +  ". Please arrive at least 15 minutes before your scheduled appointment to complete any necessary paperwork.\n" +
                    "\n" +
                    "The address for our clinic is at BangNa, and there is ample parking available for our patients. If you have any questions or concerns before your appointment, please do not hesitate to contact us at 09-123-1244.\n" +
                    "\n" +
                    "Please note that payment is due at the time of your appointment, and we accept cash, credit/debit cards, and personal checks.\n" +
                    "\n" +
                    "We look forward to seeing you at your scheduled appointment. If you are unable to keep your appointment, please let us know as soon as possible so that we may offer your appointment time to another patient in need.\n" +
                    "\n" +
                    "Thank you for choosing our clinic for your healthcare needs.\n" +
                    "\n" +
                    "Sincerely,\nDr." + doctorName +
                    "\n" +
                    "Big Smile\n" +
                    "\n" +
                    "\n";
            part1.setText(text);

//            MimeBodyPart part2 = new MimeBodyPart();
//            part2.attachFile(file);

            MimeMultipart mimeMultipart = new MimeMultipart();
            mimeMultipart.addBodyPart(part1);
//            mimeMultipart.addBodyPart(part2);

            message.setContent(mimeMultipart);
            Transport.send(message);
//            flag = true;
        }catch(Exception e){
            e.printStackTrace();

        }
//        return flag;
    }
}
