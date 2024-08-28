import axios from "axios";

const baseURL = "https://voting-app-r8ql.vercel.app";
// const baseURL: "http://localhost:5001";

export default axios.create({
  baseURL
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
