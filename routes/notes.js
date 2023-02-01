const fb = require("express").Router();
const uuid = require("uuid");
const fs = require("fs");

// GET Route for retrieving past notes
fb.get("/", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(JSON.parse(data));
      console.log("request to get notes recieived");
    }
  });
});

// POST Route for submitting new notes
fb.post("/", (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  console.log(`Body: ${req.body}`);
  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
    };
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated reviews!")
        );
      }
    });

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.json(response);
  } else {
    res.json("Error in posting note");
  }
});

module.exports = fb;
