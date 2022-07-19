import axios from 'axios';

export const DEFAULT_HEADERS = {
  Accept: 'application/json',
};

class BaseRequest {
  static headers(headers) {
    return { headers: headers || DEFAULT_HEADERS };
  }

  static get(url) {
    return axios.get(url);
  }

  static post(url, data) {
    return axios.post(url, data, this.headers());
  }

  static patch(url, data) {
    return axios.patch(url, data, this.headers());
  }

  static delete(url) {
    return axios.delete(url, this.headers());
  }
}

export default BaseRequest;
