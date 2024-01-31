import axios from "axios";

// A mock function to mimic making an async request for data
export const fetchAllProducts = async () => {
  return new Promise(async resolve => {
    const data = await axios.get("http://localhost:8080/products");
    resolve(data)
  }
  )
}

// write the function when multiple filter is selected to modify query
export const fetchAllProductsByFilter = async (filter: any, sort: any, pagination: any) => {
  // filters = {category: ["smartphones", "laptops"]}
  //sort = {_sort: "price", _order: "asc"}
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
    console.log("http://localhost:8080/products?" + queryString)
    const data = await axios.get("http://localhost:8080/products?" + queryString);
    resolve(data.data)
  }
  )
}
