const express = require("express");
const path = require("path");
const fs = require("fs");
const api = require("./routes/index"); //Sends any file starting wtih /api to the index.js file
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api); //Sends any file starting wtih /api to the index.js file
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/index", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

/*

On the back end, the application should include a `db.json` file that will be used to store and retrieve notes using the `fs` module.

The following HTML routes should be created:

- `GET /notes` should return the `notes.html` file.

- `GET *` should return the `index.html` file.

The following API routes should be created:

- `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

- `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

*/

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
