const express = require('express');
const app = express();
const PORT = 5001;
const auth = require('./routes/auth');
const post = require('./routes/post');


app.use(express.json()); // NOTE: express.json()を使うと、req.bodyがJSON形式で受け取れる
app.use("/auth", auth);
app.use("/post", post);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// expressをimportして、appを定義して、PORTを定義して、app.listen(PORT)を実行すると、サーバーが立ち上がる
app.listen(PORT, () => {
  console.log("サーバーを起動中...");
});