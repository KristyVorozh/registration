import axios from "axios";
import { baseUrl } from "../../config";

export const authRequest = async (email, password) => {
    return (await axios.post(baseUrl + "/login", {email, password}));
}
export const registerRequest = async (email, password) => {
    return (await axios.post(baseUrl + "/register", {email, password}));
}
