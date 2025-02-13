import { renderData } from "./renderData.js";

const urlStr = "https://jsonplaceholder.typicode.com/users";

export const getData = async () => {
  const url = new URL(urlStr);

  const request = new Request(url, {
    headers: { "x-tca": "Hello" },
    method: "GET",
    cache: "no-cache",
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

    const data = await response.json();
    console.log("Fetched Data:", data); // Log the fetched data

    // Create a custom response by adding headers
    const customHeaders = new Headers(response.headers);
    // Length of JSON string
    customHeaders.append("Content-Length", JSON.stringify(data).length);
    customHeaders.append("x-tca", "CustomValue");

    // Create a custom response with the new headers
    const customResponse = new Response(JSON.stringify(data), {
      status: response.status,
      statusText: response.statusText,
      headers: customHeaders,
    });

    // Log the custom headers to verify
    console.log("Custom Response Headers:");
    for (const [key, value] of customHeaders.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Call a function to display data on the page
    renderData(data);
  } catch (err) {
    console.warn(err.message);
  }
}
