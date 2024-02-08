import axios from "axios";

// A mock function to mimic making an async request for data
export const addToCart = async (product) => {
  return new Promise(async resolve => {
    const response = await axios.post("http://localhost:8080/cart", product);
    resolve(response.data);
  }
  )
}

export const getCartItemsByUser = async (userId) => {
  return new Promise(async resolve => {
    console.log("userid", userId)
    const response = await axios.get("http://localhost:8080/cart?user=" + userId);
    console.log("response cart get", response)
    resolve(response.data);
  }
  )
}
