import axios from "axios";


const api_URL = "https://dummyjson.com/auth/login";


export const loginUser=async(userData) => {
  try {
    const response =await axios.post(`${ api_URL}`, userData);
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

