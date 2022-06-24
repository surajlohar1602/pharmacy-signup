const axios = require("axios").default;

export default class AxiosServices {
  post(url, data, IsRequired = false, Header) {
    return axios.post(url, data, IsRequired && Header);
  }
}
