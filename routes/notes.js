const fb = require("express").Router();
const uuid = require("uuid");
const fs = require("fs");

// GET Route for retrieving all the feedback
fb.get("/", (req, res) => {
  fs.readFile("./db/db.json", () => {}).then((data) =>
    res.json(JSON.parse(data))
  );
});

// POST Route for submitting feedback
fb.post("/", (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      feedback_id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting note");
  }
});

module.exports = fb;
