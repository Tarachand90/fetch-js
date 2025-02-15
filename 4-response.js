import { renderData } from "./renderData.js";

const urlStr = "https://jsonplaceholder.typicode.com/users";
const imageUrl = "https://picsum.photos/id/237/200/300";
const fontStr =
  "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Hw5aXp-p7K4KLg.woff2";

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

export const fetchImage = async () => {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Image request failed with status ${response.status}`);
    }

    // Convert response to blob
    const blob = await response.blob();
    console.log("Image Blob Object: ", blob);
    // Create a Blob URL
    const imageBlobUrl = URL.createObjectURL(blob);

    // Find the image element and set its source to the Blob URL
    const imageElement = document.getElementById("pic");
    imageElement.src = imageBlobUrl;

    console.log("Image fetched and rendered from Blob");
  } catch (error) {
    console.error("Error fetching the image:", error.message);
  }
};
