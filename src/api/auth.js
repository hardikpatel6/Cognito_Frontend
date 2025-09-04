import axios from "axios";

const API = "https://65yp6hvcc6.execute-api.ap-south-1.amazonaws.com/Prod/auth"; // your backend API

export const signup = (data) => axios.post(`${API}/signup`, data);
export const signin = (data) => axios.post(`${API}/signin`, data);
export const Confirm = (data) => axios.post(`${API}/confirm`, data);
export const forgotPassword = (data) => axios.post(`${API}/forgot-password`, data);
export const confirmPassword = (data) => axios.post(`${API}/confirm-password`, data);
export const signout = () => axios.post(`${API}/signout`);
