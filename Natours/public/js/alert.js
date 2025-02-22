/* eslint-disable */

export const hideAlert = () => { 
    const el = document.querySelector( '.alert' );
    if( el ) el.parentElement.removeChild(el);  // Remove the alert div from the DOM.
}
export const showAlert = ( type, msg ) => {
    hideAlert();  // Ensure that only one alert is visible at a time.
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector( 'body' ).insertAdjacentHTML( 'afterbegin', markup );
    window.setTimeout( hideAlert, 5000);
}