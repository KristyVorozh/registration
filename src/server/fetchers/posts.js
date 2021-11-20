import axiosInstance from "../AxiosInstance";
import { baseUrl } from "../../config";

export const getPosts = async () => {
    return (await axiosInstance.get(baseUrl + "/660/posts"));
}

export const savePosts = async ({title, phone}) => {
    return (await axiosInstance.post(baseUrl + "/660/posts", {title, phone}));
}

export const updatePosts = async ({title, phone, id}) => {
    return (await axiosInstance.put(baseUrl + `/660/posts/${id}`, {title, phone}));
}

export const deletePosts = async ({title, phone, id}) => {
    return (await axiosInstance.delete(baseUrl + `/660/posts/${id}`, {title, phone}));
}