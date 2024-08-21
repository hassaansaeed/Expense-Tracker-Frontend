// src/utils/apiUtils.js
import axios from "axios";
import BASE_URL from "../config";

const instance = axios.create({
  baseURL: BASE_URL,
});

// Method for GET requests
export async function fetchData(endpoint) {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: null, error };
  }
}

// Method for POST requests
export async function postData(endpoint, data) {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.post(endpoint, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error posting data:", error);

    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    const errorStatus = error.response?.status || null;
    const errorData = error.response?.data || null;

    return {
      data: null,
      error: {
        message: errorMessage,
        status: errorStatus,
        data: errorData,
      },
    };
  }
}

export async function putData(endpoint, data) {
  const token = localStorage.getItem("token");
  try {
    const response = await instance.put(endpoint, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error putting data:", error);

    // Handle specific error details, if available
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    const errorStatus = error.response?.status || null;
    const errorData = error.response?.data || null;

    return {
      data: null,
      error: {
        message: errorMessage,
        status: errorStatus,
        data: errorData,
      },
    };
  }
}
