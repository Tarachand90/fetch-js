import express from "express";
import cors from "cors";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() }); // In-memory storage

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

app.post(
  "/",
  upload.fields([{ name: "jsonfiles" }, { name: "imgfiles" }]),
  (req, res) => {
    // Debugging to check the structure of req.files
    console.log("Uploaded Files:", req.files);
    debugger;
    // Extract the API key from the query string
    const apiKey = req.query["x-api-key"];

    // Validate the API key
    if (apiKey !== expectedApiKey) {
      return res.status(403).json({ error: "Invalid API key" });
    }

    // Extract JSON files from `req.files`
    const uploadedFiles = req.files["jsonfiles"];
    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({ error: "No JSON files uploaded" });
    }

    // Extract data from FormData (req.body is populated by multer)
    const users = [];

    // Process each uploaded JSON file
    for (const file of uploadedFiles) {
      try {
        // Parse file content as JSON
        const jsonData = JSON.parse(file.buffer.toString("utf-8"));
        const { firstName, lastName, age } = jsonData;

        if (!firstName || !lastName || !age) {
          return res
            .status(400)
            .json({ error: "Invalid data in one of the files" });
        }

        // Create a user object
        const user = {
          name: `${firstName} ${lastName}`,
          age: age,
        };
        users.push(user);
      } catch (err) {
        return res
          .status(400)
          .json({ error: "Error parsing one of the files" });
      }
    }
    // Add response headers
    res.setHeader("Content-Type", "application/json");
    res.setHeader("X-Custom-Header", "This is a custom header");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

    // Respond with the array of user objects
    res.status(201).json(users);
  }
);

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
