const OpenAI = require("openai");
const fs = require("fs");
require("dotenv").config();
const readline = require("readline");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

app.post("/createresponse", async (req, res) => {
  // Mark the function as async
  const { message } = req.body;
  console.log(message);

  try {
    const response = await openai.chat.completions.create({
      // Await the promise
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    console.log(response);
    let responseContent;

    // Assuming response.choices[0].message.content is the correct path,
    // but usually, it should be checked or validated as API responses may vary.
    try {
      // This parsing may not be necessary if the API response is already in the expected format
      responseContent = JSON.parse(response.choices[0].message.content);
    } catch (error) {
      // Handle parsing error, or fallback to the content as it is
      console.error("Error parsing JSON content:", error);
      responseContent = response.choices[0].message.content;
    }

    res.status(200).json(responseContent);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please Activate Production"));
}

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// userInterface.prompt();

// userInterface.on("line", async (input) => {
//     try {
//       // Call createChatCompletion method to get response from OpenAI
//       const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: input }],
//       });
//       // Log the response content
//       console.log(response.choices[0].message.content);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//     userInterface.prompt();
// });

//   const response = await openai.images.generate({
//     model: "dall-e-3",
//     prompt: input,
//   });
//   console.log(response.data[0].url);
//   async function main() {
//     const image = await openai.images.createVariation({
//       image: fs.createReadStream("otter.png"),
//     });

//     console.log(image.data);
//   }
//   main();
