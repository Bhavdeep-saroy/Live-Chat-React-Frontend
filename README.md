# Live Chat Application


This is a Live Chat Application with the frontend built in React and the backend developed using Node.js with Nginx. The application provides a seamless and secure platform for users to connect and chat in real time. Below is a detailed introduction to the application's functionality and features:

Application Overview
User Account Creation:

Users are required to create an account to use the application.
During registration, an OTP (One-Time Password) is sent to the user's registered email address for verification.
Once the OTP is successfully verified, the account is created, ensuring secure onboarding.
Real-Time Chat:

Users can initiate chats with other users they have followed.
The application uses Socket.IO for real-time messaging, enabling smooth and instant communication.
Follow-Based Interaction:

To maintain a focused and secure environment, users can only chat with others whom they have followed.
Features and Technologies
Frontend:

Built using React to provide a fast, responsive, and user-friendly interface.
Backend:

Developed in Node.js with Nginx for optimal performance and scalability.
Utilizes Socket.IO for real-time messaging.
Implements JWT (JSON Web Token) for secure user authentication.
Uses bcrypt for secure password hashing.
Integrates Joi for input validation, ensuring data integrity.
Email Verification:

Utilizes NodeMailer to send OTPs to users' email addresses during account registration.
Ensures a secure and reliable user verification process.
Why This Application?
This application is designed to:

Provide a secure platform for users to connect and chat in real time.
Ensure that only verified users can access the system, enhancing overall security.
Enable follow-based interaction to promote a safe and personalized chatting experience.
Feel free to explore the codebase to understand the implementation details. Feedback and contributions are welcome!

This introduction provides a comprehensive yet concise overview of your live chat application, ensuring that potential users or contributors can quickly understand its purpose and functionality.
