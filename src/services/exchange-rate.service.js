import axios from 'axios';
import { handleResponse, handleError } from '@/utils';

export const exchangeRateService = {
  index() {
    return axios
      .get('https://api.exchangeratesapi.io/latest?base=PHP')
      .then(handleResponse)
      .catch(handleError);
  },
  get(symbol) {
    return axios
      .get(`https://api.exchangeratesapi.io/latest?symbols=PHP&base=${symbol}`)
      .then(handleResponse)
      .catch(handleError);
  }
};
