const express = require('express');
const app = express();
const PORT = 5001;
const auth = require('./routes/auth');

app.use("/auth", auth);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("サーバーを起動中...");
});