import axios from "axios";

export const getLoggedInUserinfo = async (userId) => {
  return new Promise(async resolve => {
    const response = await axios.get("http://localhost:8080/users/" + userId);
    resolve(response.data)
  }
  )
}

export const getuserOrdersInfo = async (userId) => {
  return new Promise(async resolve => {
    const response = await axios.get("http://localhost:8080/orders/?" + userId);
    resolve(response.data)
  }
  )
}

export const updateUser = async(user) => {
  return new Promise(async resolve => {
    const response = await axios.put("http://localhost:8080/users/"+user.id, user);
    resolve(response.data);
    });
}