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
    return { data: null, error };
  }
}
