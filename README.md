# Simple OTP and Confirmation Sms Service

## Service is Created Using Twilio API

## How to run the app

1.  Go to [Twilio](https://www.twilio.com/) Website

2.  Create or Login into Twilio Account

3.  Go to Your Dashboard.

4.  Get Your TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN.

5.  Get your TWILIO_PHONE_NUMBER.

6.  Now either fork or download the app and open the folder in the cli

7.  Go to the folder , open terminal and `code .` for vscode users

8.  Copy TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN & TWILIO_PHONE_NUMBER in the .env file

9.  Install all dependencies using `npm install` command

10. Start the web server using the `npm start` command

11. The app will be served at localhost:3000

12. No Database is used , Data will be lost when server is restarted.

## How to Order

1. Enter the Phone number,OTP will be sent to your number

2. Enter the OTP

3. Select what you want to order

4. Click on Order

5. Sms will be sent to you containing bill Amount and OrderId.

## Dependencies

- Twilio

- Express

- Body-parser

- dotenv

- ejs

- materialize-css

## What the app looks like

![alt text](https://github.com/Flux99/OTP-and-Confirmation-Sms-Using-Twilio/blob/master/Screenshot/Screenshot_1.png?raw=true)

![alt text](https://github.com/Flux99/OTP-and-Confirmation-Sms-Using-Twilio/blob/master/Screenshot/Screenshot_2.jpeg?raw=true)

![alt text](https://github.com/Flux99/OTP-and-Confirmation-Sms-Using-Twilio/blob/master/Screenshot/Screenshot_3.jpeg?raw=true)

![alt text](https://github.com/Flux99/OTP-and-Confirmation-Sms-Using-Twilio/blob/master/Screenshot/Screenshot_4.jpeg?raw=true)
