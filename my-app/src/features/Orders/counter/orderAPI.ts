import axios from "axios";

// A mock function to mimic making an async request for data
export const placeOrder = async (orderInfo) => {
  return new Promise(async resolve => {
    const response = await axios.post("http://localhost:8080/orders", orderInfo);
    resolve(response.data);
  }
  )
}