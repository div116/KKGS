import axios from "axios";

// A mock function to mimic making an async request for data
export const createUser = async (data) => {
  return new Promise(async resolve => {
    const response = await axios.post("http://localhost:8080/users", data);
    resolve(response.data);
    });

  }

  export const loginUser = async (data) => {
    return new Promise(async (resolve, reject) => {
      let email = data.email
      let password = data.password
      const response = await axios.get("http://localhost:8080/users"+"?email="+email+"&password="+password);
      if(response.data.length) {
        resolve(response.data[0]);
      }
      else {
        reject({"Message ": "InValid Credentials"})
      }
      });
  }

  export const signOutUser = async () => {
    return new Promise(async resolve => {
      // const response = await axios.get("http://localhost:8080/logout");
      resolve({data: "Successfully logged Out"});
      });
  }

