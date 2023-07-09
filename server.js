/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const path = require("path");
// eslint-disable-next-line no-undef
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => console.log("React server is up!"));
