import Axios, { AxiosResponse } from "axios";
import UserModel from "../models/user_model";
import { baseUrl } from "../config/index";

export default class HttpUtils {
  static async fetchUser(emailOrId: string): Promise<AxiosResponse<UserModel>> {
    return await this.fetchRequest(`/api/user/${emailOrId}`);
  }

  static async fetchRequest<T>(path: string): Promise<AxiosResponse<T>> {
    return await Axios.get(baseUrl + path);
  }
}
