// API Keys, Authorization, Credentials, Content-Security-Policy

const urlStr = "http://127.0.0.1:8787/";
const apiKey = "ksldjflkjsd"; //correct api-key

//const apiKey = "ksldjflkjsd1"; //in-correct api-key

let fileName = "userData.json";

export const getData = async () => {
  try {
    // Step 1: Fetch user data from a local JSON file
    const userDataResponse = await fetch(fileName);
    if (!userDataResponse.ok) {
      throw new Error(
        `Failed to load user data file: ${userDataResponse.status}`
      );
    }
    const userData = await userDataResponse.json(); // Read JSON data

    // Step 2: Set up headers
    let headers = new Headers();
    headers.append("content-type", "application/json"); // Ensure JSON content

    // Step 3: Create the URL with API key
    const url = new URL(urlStr);
    url.searchParams.append("x-api-key", apiKey); // Add the API key to the query

    // Convert the data object to a JSON string
    let bodyContent = JSON.stringify(userData);

    // Create a POST request
    let request = new Request(url, {
      method: "POST",
      headers: headers,
      body: bodyContent,
      cache: "default",
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }

    const responseData = await response.json(); // Expect JSON from the server
    console.log("Server Response:", responseData); // Log the server response

    // Log all response headers
    for (let [key, value] of response.headers.entries()) {
      console.log(`${key}: ${value}`);
    }
  } catch (err) {
    console.warn("Error posting data:", err.message);
  }
};
