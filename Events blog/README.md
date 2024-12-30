# Events Blog

An Events Blog application built with Node.js, Express, MongoDB, and EJS. This application allows users to create, view, edit, and delete events. Users can also upload profile pictures and view them in their profiles.

---

## Table of Contents

- [Live Demo](#live-demo)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Routes](#routes)
- [File Structure](#file-structure)
- [Dependencies](#dependencies)
- [Recommended Environment](#recommended-environment)
- [Use Cases](#use-cases)
- [Advantages](#advantages)
- [Disadvantages](#disadvantages)
- [Capabilities](#capabilities)
- [Limitations](#limitations)
- [License](#license)

---

## Live Demo

[Live Demo Link](https://example.com/events-blog)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/events-blog.git
   cd events-blog
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** with the following variables:
   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

---

## Configuration

Ensure that the `app.js` file is set up to serve static files correctly and connect to MongoDB. Below is an example configuration:

```javascript
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/passport-setup');

// Load environment variables
require('dotenv').config();

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/events', require('./routes/event-routes'));
app.use('/users', require('./routes/user-routes'));

// Set view engine
app.set('view engine', 'ejs');

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

---

## Usage

### Creating an Event
- Navigate to `/events/create`.
- Fill out the event form and submit it.

### Viewing Events
- Navigate to `/events` to view all events with pagination.

### Editing an Event
- Click on an event to view its details.
- Click the "Edit" button to edit the event.

### Deleting an Event
- Click the "Delete" button on an event to delete it.

### Uploading a Profile Picture
- Navigate to `/users/profile`.
- Upload a profile picture and submit it.

---

## Routes

### User Routes
- `GET /users/login`: Render login page.
- `POST /users/login`: Handle login form submission.
- `GET /users/signup`: Render signup page.
- `POST /users/signup`: Handle signup form submission.
- `GET /users/profile`: Render user profile page.
- `POST /users/uploadAvatar`: Handle avatar upload.
- `GET /users/logout`: Logout user.

### Event Routes
- `GET /events/create`: Render create event page.
- `POST /events/create`: Handle create event form submission.
- `GET /events/:pageNo?`: List events with pagination.
- `GET /events/show/:id`: View a single event.
- `GET /events/edit/:id`: Render edit event page.
- `POST /events/update`: Handle update event form submission.
- `DELETE /events/delete/:id`: Delete an event.

---

## File Structure

```plaintext
your_project/
|-- config/
|   |-- database.js
|   |-- passport-setup.js
|-- models/
|   |-- Event.js
|   |-- User.js
|-- public/
|   |-- js/
|       |-- main.js
|-- routes/
|   |-- event-routes.js
|   |-- user-routes.js
|-- views/
|   |-- event/
|       |-- create.ejs
|       |-- edit.ejs
|       |-- index.ejs
|       |-- show.ejs
|   |-- partials/
|       |-- flashMessages.ejs
|       |-- footer.ejs
|       |-- header.ejs
|       |-- navbar.ejs
|   |-- user/
|       |-- login.ejs
|       |-- profile.ejs
|       |-- signup.ejs
|-- uploads/
|   |-- images/
|       |-- [uploaded_images]
|-- .env
|-- .gitattributes
|-- app.js
|-- package.json
|-- README.md
```

---

## Dependencies

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **Mongoose**: MongoDB object modeling
- **Passport**: Authentication middleware
- **Multer**: Middleware for handling file uploads
- **EJS**: Embedded JavaScript templating
- **Axios**: Promise-based HTTP client
- **Moment.js**: Date manipulation library

---

## Recommended Environment

- **Operating System**: Windows, macOS, or Linux
- **Node.js Version**: 12.x or higher
- **MongoDB**: Version 4.x or higher
- **Browser**: Latest version of Chrome, Firefox, Edge, or Safari

---

## Use Cases

- **Event Management**: Create, view, edit, and delete events for personal or organizational purposes.
- **User Profiles**: Allow users to manage their profiles, including uploading profile pictures.
- **Event Promotion**: Promote and share events with an easy-to-use web interface.

---

## Advantages

- **Easy to Use**: Simple and intuitive event management interface.
- **Modular Codebase**: Organized structure makes it easy to extend and maintain.
- **Responsive Design**: Compatible with various devices and screen sizes.

---

## Disadvantages

- **Basic Features**: Limited to basic event management functionalities.
- **No Real-Time Updates**: Does not support real-time event updates.
- **Single User**: Authentication and profile management are basic and may need enhancements for multi-user environments.

---

## Capabilities

- **Create Events**: Users can create events with details like title, description, location, and date.
- **View Events**: Users can view a list of events with pagination support.
- **Edit Events**: Users can edit event details.
- **Delete Events**: Users can delete events.
- **User Authentication**: Basic authentication system with login and signup functionalities.
- **Profile Management**: Users can upload pictures and manage their profiles.

---

## Limitations

- **No Email Notifications**: The application does not send email notifications for events.
- **No Social Media Integration**: Events cannot be shared directly on social media platforms.
- **No Calendar Integration**: Events are not integrated with calendar applications.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
