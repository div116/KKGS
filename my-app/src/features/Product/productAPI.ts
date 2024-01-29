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
export const fetchAllProductsByFilter = async (filters: any) => {
  return new Promise(async resolve => {

    let queryString = ""
    for (let key in filters) {
      queryString = queryString + `${key}=${filters[key]}&`
    }

    console.log("http://localhost:8080/products?"+ queryString)

    const data = await axios.get("http://localhost:8080/products?"+ queryString);
    resolve(data)
  }
  )
}
