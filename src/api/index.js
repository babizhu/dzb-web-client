import Api from './api';
import {BASE_URI} from '../conf/config'

const api = new Api({
  //baseURI: 'http://192.168.2.109:8080/',
  baseURI: BASE_URI,
  //baseURI: 'http://www.facebook.com:8080/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api
