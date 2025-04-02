import axios from "axios";


const api_URL = "https://dummyjson.com/auth/login";


export const loginUser=async(userData) => {
  try {
    const response =await axios.post(`${ api_URL}`, userData);//userData
    console.log(userData)
    return response.data; 
  } catch (error) {
    throw error; 
  }
};


const base_URL = "https://67eb8090aa794fb3222a74f6.mockapi.io/users/users";

export async function fetchPost() {
  const response = await axios.get(base_URL);
  return  response;
}
// Add a new user
export const addUser = async (userData) => {
  try {
    const response = await axios.post(base_URL, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${base_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// // Update an existing user by ID
// export const updateUser = async (userId, userData) => {
//   try {
//     const response = await axios.put(`${base_URL}/${userId}`, userData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

