import axios from "axios";
import { loginValidation } from "../utils/functions";
import { QueryParams } from "../utils/interfaces";

export default class Services {
  static BASE_URL = "https://taskapi.hiweb.ir/api";
  static LOGIN_API = "/Security/UserLogin/Login";
  static REGENERATE_ACCESS_TOKEN_API = "/Security/UserLogin/RefreshToken";
  static GET_PRODUCT_API = "/General/Product/ProductList";
  static ADD_PRODUCT_API = "/General/Product/AddProduct";

  static async loginByAccessToken(body) {
    return axios
      .post(Services.BASE_URL + Services.LOGIN_API, body)
      .then((res) => res.data.data ?? null);
  }

  static async regenerateAccessToken(body) {
    return axios
      .post(Services.BASE_URL + Services.REGENERATE_ACCESS_TOKEN_API, body)
      .then((res) => res.data.data ?? null);
  }

  static async getProducts(params:QueryParams) {
    const token = await loginValidation();
    return axios
      .get(Services.BASE_URL + Services.GET_PRODUCT_API, {
        params: params,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => console.log(err));
  }

  static async addProducts(body) {
    const token = await loginValidation();
    return axios
      .post(Services.BASE_URL + Services.ADD_PRODUCT_API, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => console.log(err));
  }
}
