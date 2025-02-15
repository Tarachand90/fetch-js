// API Keys, Authorization, Credentials, Content-Security-Policy

const urlStr = "http://127.0.0.1:8787/";
//const apiKey = "ksldjflkjsd"; //correct api-key

const apiKey = "ksldjflkjsd1"; //in-correct api-key

export const getData = async () => {
  // Data to send
  const userData = {
    firstName: "Tara",
    lastName: "Chand",
    age: 30,
  };

  let headers = new Headers();
  headers.append("content-type", "application/json"); // Ensure JSON content

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

  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`
      );
    }

    const responseData = await response.json(); // Expect JSON from the server
    console.log("Server Response:", responseData); // Log the server response
  } catch (err) {
    console.warn("Error posting data:", err.message);
  }
};
