import axios from "axios";

export const fetchAllProducts = async () => {
  return new Promise(async resolve => {
    const data = await axios.get("http://localhost:8080/products");
    resolve(data)
  }
  )
}

export const fetchAllProductsByFilter = async (filter: any, sort: any, pagination: any) => {
  let queryString = '';
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 1) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1]
      queryString += `${key}=${lastCategoryValue}&`
    } else {
      queryString += `${key}=${filter[key]}&`
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async resolve => {
    const response: any = await axios.get("http://localhost:8080/products?" + queryString);
    const totalItems = response.headers['X-Total-Count'];
    //provided static value for totalItems as i am facing difficulty to read the value of header x-total-count as it is getting filtered out in reponse
    resolve({ products: response.data, totalItems: 99 })
  }
  )

}

export const fetchAllCategories = async () => {
  return new Promise(async resolve => {
    const data = await axios.get("http://localhost:8080/categories");
    resolve(data)
  }
  )
}

export const fetchAllBrands = async () => {
  return new Promise(async resolve => {
    const data = await axios.get("http://localhost:8080/brands");
    resolve(data)
  }
  )
}

export const fetchProductById = async (id: any) => {
  return new Promise(async resolve => {
    const data = await axios.get("http://localhost:8080/products/" + id);
    resolve(data)
  }
  )
}

export const addproduct = async (product: any) => {
  return new Promise(async resolve => {
    const data = await axios.post("http://localhost:8080/products", product);
    resolve(data);
  }
  )
}

export const updateProduct = async (product: any, id) => {
  return new Promise(async resolve => {
    const data = await axios.put("http://localhost:8080/products/" + id, product);
    resolve(data);
  }
  )
}