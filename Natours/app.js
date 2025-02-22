const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
///1) GLOBAL MIDDLEWARE
// serving static files
app.use(express.static(path.join(__dirname, `public`)));

//set security HTTP headers
app.use(helmet());

app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies
console.log(process.env.NODE_ENV);

// logging middleware in development environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour.'
});
app.use('/api', limiter);

// parse JSON request bodies for POST, PUT and PATCH requests(reading data from body into req.body)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser()); // use cookie parser middleware//+

// sanitize data (remove unwanted fields) against NoSQL queries injections
app.use(mongoSanitize());
// Data sanitization against xss (cross site scripting attacks)
app.use(xss());

// prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'maxGroupSize',
      'ratingsQuantity',
      'ratingsAverage',
      'difficulty',
      'price'
    ] // allow listed fields in query string
  })
);
//compress text content responses
app.use(compression());

app.use((req, res, next) => {
  console.log('Hello from the MIDDLEWARE :eight_spoked_asterisk:');
  next();
});
// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this srver`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
