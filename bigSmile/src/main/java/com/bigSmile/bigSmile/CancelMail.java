package com.bigSmile.bigSmile;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;

import java.util.Properties;

public class CancelMail {
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
            String subject = "Clinic Booking Cancellation";
            message.setSubject(subject);

            MimeBodyPart part1 = new MimeBodyPart();
            String text = "Dear "+ patientName +
                    "\n" +
                    " regret to inform you that I must cancel our scheduled appointment at " + time +
                    "\n" +
                    "Unfortunately, an unforeseen circumstance has arisen that requires me to attend to urgent personal matters.\n" +
                    "\n" +
                    "I apologize for any inconvenience this may cause you, and I hope you will understand the situation. I would be more than happy to reschedule our appointment at a later date that is convenient for you. Please let me know if this works for you, and we can make arrangements accordingly.\n" +
                    "\n" +
                    "Again, I apologize for any inconvenience caused by this cancellation. If you have any questions or concerns, please do not hesitate to reach out to me.\n" +
                    "\n" +
                    "Thank you for your understanding\n" +
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
