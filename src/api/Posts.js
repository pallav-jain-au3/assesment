import { getRequest } from "../axiosClient";

export async function getPosts(query) {
  try {
    const response = await getRequest(`/posts`, { params: query });
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}
