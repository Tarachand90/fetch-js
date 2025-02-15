// API Keys, Authorization, Credentials, Content-Security-Policy

const urlStr = "http://127.0.0.1:8787/";
const apiKey = "ksldjflkjsd"; //correct api-key

// Function to read a file from browser input
export const readFileFromInput = async (inputElement) => {
  const file = inputElement.files[0];
  if (!file) {
    throw new Error("No file selected!");
  }

  const fileText = await file.text();
  return JSON.parse(fileText); // Parse the file to JSON
};

// Function to send data to the server
export const sendDataToServer = async (data) => {
  let headers = new Headers();
  headers.append("content-type", "application/json");

  const url = new URL(urlStr);
  url.searchParams.append("x-api-key", apiKey);

  const request = new Request(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}: ${response.statusText}`
    );
  }

  const responseData = await response.json();
  console.log("Server Response:", responseData);

  for (let [key, value] of response.headers.entries()) {
    console.log(`${key}: ${value}`);
  }
};

export const getData = async () => {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("myform");
    const jsonFileInput = document.getElementById("jsonfile");
    const sendButton = document.getElementById("btnSend");

    sendButton.addEventListener("click", async (event) => {
      event.preventDefault();

      try {
        const fileData = await readFileFromInput(jsonFileInput);
        await sendDataToServer(fileData);
      } catch (error) {
        console.error("Error:", err.message);
      }
    });
  });
};
