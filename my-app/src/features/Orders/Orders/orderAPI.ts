import axios from "axios";

// A mock function to mimic making an async request for data
export const placeOrder = async (orderInfo) => {
  return new Promise(async resolve => {
    const response = await axios.post("http://localhost:8080/orders", orderInfo);
    resolve(response.data);
  }
  )
}

export const updateOrder = async (order) => {
  return new Promise(async resolve => {
    const response = await axios.patch("http://localhost:8080/orders/" + order.id, order);
    resolve(response.data);
  })
}

export const fetchAllOrders = async (sort, pagination) => {
  let queryString = '';
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async resolve => {
    // console.log("http://localhost:8080/orders?" + queryString)
    const data = await axios.get("http://localhost:8080/orders?" + queryString);
    console.log("api orders data", data)
    resolve({ orders: data.data.data, totalOrders: data.data.items })
  })
}