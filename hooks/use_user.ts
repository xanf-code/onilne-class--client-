import useSWR from "swr";
import BackendUtils from "../utils/backend_utils";
import UserModel from "../models/user_model";
import HttpUtils from "../utils/http_utils";

export interface UseUserResponse {
  user: UserModel;
  isLoading: boolean;
  isError: boolean;
}

export default function useUser(emailOrId: string): UseUserResponse {
  const { data, error } = useSWR(
    `/api/user/${emailOrId}`,
    HttpUtils.fetchRequest
  );

  return {
    user: data?.data as UserModel,
    isLoading: !error && !data,
    isError: error,
  };
}
