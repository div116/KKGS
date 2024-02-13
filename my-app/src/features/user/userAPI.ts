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