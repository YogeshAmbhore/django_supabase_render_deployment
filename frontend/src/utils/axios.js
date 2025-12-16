import axios from "axios"


console.log("here ======>> ", import.meta.env.VITE_API_BASE_URL)

export const instance = axios.create(
    {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        timeout: 15000,
        withCredentials: true
    }
);


// Request interceptor
instance.interceptors.request.use(
    (config) => {
        // Example: attach auth token later
        // const token = localStorage.getItem("access_token");
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }

        return config;
    },
    (error) => Promise.reject(error)
);


// Response interceptor
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                console.warn("Unauthorized");
                // redirect to login if needed
            }

            if (status === 403) {
                console.warn("Forbidden");
            }

            if (status >= 500) {
                console.error("Server error");
            }
        }

        return Promise.reject(error);
    }
);


