import express from "express";
import cors from "cors";

const app = express();
const port = 8787; /// http://127.0.0.1:8787/ksldjflkjsd
const expectedApiKey = "ksldjflkjsd"; // Expected API key

// make sure you have nodeJS installed from https://nodejs.org/
//cd server
//npm install
//node main.js

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  // Extract the API key from the query string
  const apiKey = req.query["x-api-key"];

  // Validate the API key
  if (apiKey !== expectedApiKey) {
    return res.status(403).json({ error: "Invalid API key" });
  }
  // Extract user data from the request body
  const { firstName, lastName, age } = req.body;
  if (!firstName || !lastName || !age) {
    return res.status(400).json({ error: "Invalid data" });
  }

  // Create a combined response
  const responseData = {
    name: `${firstName} ${lastName}`,
    age: age,
  };

  // Add response headers
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Custom-Header", "This is a custom header");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  // Respond with the transformed data
  res.status(201).json(responseData);
});

app.put("/:id", (req, res) => {
  res.status(200).send("thanks for updating something");
});

app.patch("/:id", (req, res) => {
  res.status(200).send("thanks for updating something");
});

app.delete("/:id", (req, res) => {
  res.status(200).send("thanks for deleting something");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
