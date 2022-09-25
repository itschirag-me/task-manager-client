import { apiProvider } from "./provider";

export const TaskListService = async () => {
  const { data } = await apiProvider.get("/tasks");
  return data;
};

export const TaskCreateService = async (payload) => {
  const { data } = await apiProvider.post(`/tasks`, payload);
  return data;
};

export const TaskStatusUpdateService = async (id, payload) => {
  const { data } = await apiProvider.put(`/tasks/status/${id}`, payload);
  return data;
};
