/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alert.js';

//type is either 'passwords' or 'data'
export const updateSettings = async (data, type) => {
    try {
      const url =
        type === 'passwords'
          ? '/api/v1/users//updateMyPassword'
                : '/api/v1/users/updateMe';
        
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
