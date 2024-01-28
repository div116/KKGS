// A mock function to mimic making an async request for data
export const fetchCount = async () => {
  return new Promise(async resolve => {
   const response = await fetch("http://localhost:8080");
   const data = await response.json();
   resolve(data)
  }
  )
}
