export const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api"
      : import.meta.env.VITE_BACKEND_URL
      ? `${import.meta.env.VITE_BACKEND_URL}/api`
      : "/api",
  withCredentials: true,
});
