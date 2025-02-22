/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert.js';

const stripe = Stripe(
  'pk_test_51QtWBvPF1f1XL63ttbSGrCZuimdTu2C9fL95VxsgnofNZ8gS6iVmzSySTZi9Uqad1k78CsGOwCFuAyA1Q5bbIfac00NoeFoIjx'
);

export const bookTour = async tourId => {
  try {
    // 1) Get ckeckout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2) Create ckeckout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('Error processing your payment. Please try again!', err);
  }
};
