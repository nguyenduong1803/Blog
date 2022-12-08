import Axios, { AxiosInstance } from 'axios'
class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = Axios.create({
      baseURL: 'http://localhost:5001/api/',
      timeout: 10000
    })
  }
}
export default new Http().instance
