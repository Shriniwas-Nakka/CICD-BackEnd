/***********************************************
 * @Purpose - FundooNotes (sending email for email verification)
 * @file    - nodemailer.js
 * @author  - Shriniwas Nakka
 * @since   - 23/07/2019
 ***********************************************/

var nodemailer = require('nodemailer');

module.exports = {
    mailsend(email, url) {
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                //user: process.env.email,
                //pass: process.env.password
            }
        });

        /**
         * @description : contains a mail details
         */
        let mailDatails = {
            //from : process.env.email,
            to : email,
            subject : 'Email Verification',
            html : "<h3>FundooNotes</h3><br>Hello,<br> Please Click on the link to verify your email.<br><a href="+url+">Link</a>"
        };

        /**
         * @description : sends an email using preselected transporter object
         */
        transporter.sendMail(mailDatails, (err, data) => {
            if(err){
                console.log('Failed to send mail.',err);
            }else{
                console.log('Mail sent successfully to your registered email ID.', data);
            }
        });
    }
}
