/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert.js';

//type is either 'passwords' or 'data'
export const updateSettings = async (data, type) => {
    try {
      const url =
        type === 'passwords'
          ? 'http://127.0.0.1:3000/api/v1/users//updateMyPassword'
                : 'http://127.0.0.1:3000/api/v1/users/updateMe';
        
    const res = await axios({
      method: 'PATCh',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
