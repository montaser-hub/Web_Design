# Natours Application

Natours is a **feature-rich tour booking and management application** built with Node.js. It allows users to **browse, book, and manage tours**, while providing **authentication, authorization, payments, and advanced query filtering**. The app follows the **MVC (Model-View-Controller)** architecture and includes robust security features and API endpoints for seamless user interactions. 😃

## 🚀 Technologies Used

| Technology       | Description |
|-----------------|-------------|
| **Node.js**     | Backend runtime |
| **Express.js**  | Web framework |
| **MongoDB** & Mongoose | NoSQL database & ODM |
| **JWT**         | Authentication |
| **Bcrypt.js**   | Password hashing |
| **Multer**      | File uploads |
| **Nodemailer**  | Email handling |
| **Pug**         | Templating engine for emails |
| **dotenv**      | Environment variable management |
| **Helmet**      | Security HTTP headers |
| **Express Rate Limit** | API rate limiting |
| **Mongo Sanitize** | Prevents NoSQL injection |
| **XSS Clean**   | Prevents cross-site scripting |
| **HPP**         | Prevents HTTP parameter pollution |
| **Validator.js** | Input validation |
| **Compression** | Response compression |
| **Parcel Bundler** | JavaScript bundling |
| **Axios**       | HTTP requests |
| **Sharp**       | Image processing |
| **ESLint & Prettier** | Code linting & formatting |
| **Stripe API**  | Payment integration |
| **Mapbox** | Interactive maps |
| **SendGrid**  | Email notifications (via Nodemailer) |


## 📁 Project Structure

```
Natours/
│── server.js  # Main entry point
│── config/    # Configuration files
│── models/    # Mongoose models
│── routes/    # Express route handlers
│── controllers/ # Business logic controllers
│── services/  # Utility and helper services
│── views/     # Pug templates for emails
│── public/    # Static files (CSS, images, JavaScript)
│── utils/     # Utility functions (error handling, email, etc.)
```

### Key Directories & Files

- **Controllers:** Handles business logic (authentication, bookings, users, tours, etc.)
- **Models:** Mongoose schemas for database operations
- **Routes:** API endpoints for users, tours, reviews, and bookings
- **Utils:** Helper functions (error handling, email, etc.)
- **Views:** Pug templates for email generation

## ✨ Features

### 🔹 User Authentication & Authorization
- Signup, Login, Password Reset
- Role-based access control (User, Admin, Guide, Lead-Guide)

### 🔹 Advanced Query Filtering & Pagination
- Filtering by fields, sorting, pagination

### 🔹 Email Services
- Welcome emails
- Password reset emails with expiration tokens

### 🔹 Security & Best Practices
- Custom error classes (AppError)
- Secure password hashing (bcrypt.js)
- Prevent unauthorized access
- Helmet.js for setting HTTP headers
- Rate-limiting to prevent abuse
- MongoDB NoSQL injection prevention using sanitization
- Validation on user inputs

### 🔹 Tour Management
- Browse available tours with advanced filters
- View detailed information about a specific tour, including duration, price, and locations
- Upload tour images and manage multimedia content
- Post reviews and ratings

### 🔹 **Tour Booking System**
- **Secure Stripe Integration**: Users can book tours and complete payments securely
- **Booking Confirmation**: Email confirmation and invoice generation upon successful booking
- **User Booking History**: View and manage previous bookings

### 🔹 User Profile & Account Management
- Update personal information
- Change password
- Manage bookings and reviews

### 🔹 Admin Panel
- Create, edit, and delete tours
- Manage user roles and access control
- Monitor bookings, reviews, and payments

## 🛠 Installation & Setup

### 1️⃣ Clone the repository:
```sh
git clone https://github.com/your-username/natours.git
cd natours
```

### 2️⃣ Install dependencies:
```sh
npm install
```

### 3️⃣ Set up environment variables:
Create a `.env` file in the root directory and define:
```env
NODE_ENV=development
PORT=3000
DATABASE=your-mongodb-uri
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
EMAIL_USERNAME=<your-email-username>
EMAIL_PASS=<your-email-password>
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=587
EMAIL_FROM=<your-email@example.com>
SENDGRID_USERNAME=apikey
SENDGRID_PASSWORD=<your-sendgrid-api-key>
STRIPE_SECRET_KEY=your-stripe-key
```

### 4️⃣ Run the development server:
```sh
npm run dev
```
The server will start at `http://localhost:3000`

## 📌 API Endpoints

### 🔹 Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/v1/users/signup` | Register a new user |
| POST   | `/api/v1/users/login` | Log in user |
| GET    | `/api/v1/users/logout` | Log out user |
| POST   | `/api/v1/users/forgotPassword` | Send reset link |

### 🔹 Tour Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/v1/tours` | Get all tours |
| GET    | `/api/v1/tours/:id` | Get a specific tour |
| POST   | `/api/v1/tours` | Create a new tour (Admin) |
| PATCH  | `/api/v1/tours/:id` | Update tour (Admin) |
| DELETE | `/api/v1/tours/:id` | Delete tour (Admin) |

### 🔹 Booking Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/v1/bookings/checkout-session/:tourId` | Create Stripe checkout session for booking |
| GET    | `/api/v1/bookings/my-bookings` | View user bookings |
| GET    | `/api/v1/bookings` | View all bookings (Admin only) |
| DELETE | `/api/v1/bookings/:id` | Cancel a booking (Admin/User) |

### 🔹 Review Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/v1/reviews` | Get all reviews |
| POST   | `/api/v1/tours/:tourId/reviews` | Post a review (Auth required) |
| PATCH  | `/api/v1/reviews/:id` | Update review (Admin/User) |
| DELETE | `/api/v1/reviews/:id` | Delete review (Admin/User) |

## 📌 Upcoming Features
- **Gift Card & Discount System**
- **Live Chat Support** for tour-related inquiries
- **Multi-Currency Support** for international travelers
- **Integration with Travel APIs** for flight & hotel recommendations

## 📜 License
This project is licensed under the **MIT License**.

---
🚀 **Natours** provides a seamless and secure experience for booking unforgettable tours! Let us know how we can improve. 🌍



