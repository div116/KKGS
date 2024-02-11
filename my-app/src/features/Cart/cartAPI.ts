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
    const response = await axios.get("http://localhost:8080/cart?user=" + userId);
    resolve(response.data);
  }
  )
}

export const updateCart = async (update) => {
  return new Promise(async resolve => {
    const response = await axios.put("http://localhost:8080/cart/"+update.id, update);
    resolve(response.data);
  })
}

export const removeFromCart = async (product) => {
  return new Promise(async resolve => {
    const response = await axios.delete("http://localhost:8080/cart/"+product.id);
    resolve(response.data);
  })
}

export const clearCart = async (userId) => {
  return new Promise(async resolve => {
    const items = await getCartItemsByUser(userId);
    for(let item of items as any) {
      await removeFromCart(item);
    }
    resolve({message: "Cart Cleared"});
  })
}