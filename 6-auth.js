// API Keys, Authorization, Credentials, Content-Security-Policy

const urlStr = "http://127.0.0.1:8787/";

export const getData = () => {
  const url = new URL(urlStr);
  let h = new Headers();
  h.append("content-type", "application/json");
  //h.append("origin", "https://cia.org"); // for CORS
  h.append("x-api-key", "ksldjflkjsd"); //API KEY
  //h.append("Authorization", "Bearer ksldjflkjsd"); //JWT
  let request = new Request(url, {
    method: "GET", //post, check server --> main.js post method
    headers: h,
    cache: "default",
    credentials: "same-origin",
  });
  getDataAsync(request);
};

async function getDataAsync(request) {
  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.text();
    console.log("Fetched Data:", data); // Log the fetched data
  } catch (err) {
    console.warn(err.message);
  }
}
