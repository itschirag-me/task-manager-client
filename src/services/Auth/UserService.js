import { objectToQuery } from "../../utils/constant";
import { apiProvider } from "../provider";

export const UserProfileService = async () => {
  const { data } = await apiProvider.get("/user/profile");
  return data;
};

export const UsersListService = async (filter) => {
  const params = objectToQuery(filter);
  const { data } = await apiProvider.get(`/user?${params}`);
  return data;
};

export const UsersAllListService = async (filter) => {
  const params = objectToQuery(filter);
  const { data } = await apiProvider.get(`/user/all?${params}`);
  return data;
};

export const UpdateUserProfileService = async (payload) => {
  const { data } = await apiProvider.put("/user/profile", payload);
  return data;
};
