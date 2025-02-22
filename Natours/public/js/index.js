/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSittings';
import {bookTour} from './stripe';
// DOM elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPassowrdForm = document.querySelector('.form-user-passowrd');
const bookBtn = document.getElementById('book-tour');
// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if ( logOutBtn ) logOutBtn.addEventListener( 'click', logout );

if ( userDataForm ) {
  userDataForm.addEventListener( 'submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append( 'name', document.getElementById( 'name' ).value );
    form.append('email', document.getElementById('email').value);
    form.append( 'photo', document.getElementById( 'photo' ).files[ 0 ] );
    console.log( form );
    
    // const name = document.getElementById('name').value;
    // const email = document.getElementById('email').value;
    // updateSettings({ name, email }, 'data');
    updateSettings(form, 'data');
  });
}

if (userPassowrdForm) {
  userPassowrdForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector( '.btn--save-password' ).textContent = 'Updating....';

    const passowrdCurrent = document.getElementById('passowrd-current')
      .value;
    const passowrd = document.getElementById('passowrd').value;
    const passowrdConfirm = document.getElementById('passowrd-confirm')
      .value;
    await updateSettings(
      { passowrdCurrent, passowrd, passowrdConfirm },
      'passowrd'
    );

    document.querySelector('.btn--save-password').textContent =
      'Save Password';
    // clear form inputs
    document.getElementById('passowrd-current').value = '';
    document.getElementById('passowrd').value = '';
    document.getElementById('passowrd-confirm').value = '';
  });
}

if ( bookBtn ) {
  bookBtn.addEventListener( 'click', async e => {
    e.target.textContent = 'Processing...';
    // const tourId = +e.target.dataset.tourId;
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  } )
}