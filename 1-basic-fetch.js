//the simplest fetch you can use and still have error handling
const url = "https://jsonplaceholder.typicode.com/users";

export function getData() {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Was not a valid response");
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.warn(err.message);
    });
}
