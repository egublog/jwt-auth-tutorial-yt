const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const {User} = require("../db/User");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("Hello Auth!");
});

// ユーザー新規登録用のAPI
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email, password);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // DBにユーザーが存在してるか確認
  const user = User.find(user => user.email === email);

  if(user) {
    return res.status(400).json({ errors: [{ msg: "ユーザーが存在しています" }] });
  }

  // パスワードの暗号化
  let hashedPassword = await bcrypt.hash(password, 10);

  // DBへ保存
  User.push({
    email,
    password: hashedPassword,
  });

  // クライアントへJWTの発行
  const token = await JWT.sign(
    {
      email,
    },
    "SECRET_KEY",
    {
      expiresIn: "24h",
    }
  );

  return res.json({
    token: token,
  });
});

// ログイン用のAPI
router.post("/login", async (req, res) => {
  const {email, password} = req.body;

  const user = User.find(user => user.email === email);
  if(!user) {
    return res.status(400).json({ errors: [{ msg: "ユーザーが存在していません" }] });
  }

  // パスワードの複合、照合
  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) {
    return res.status(400).json({ errors: [{ msg: "パスワードが間違っています" }] });
  }

  const token = await JWT.sign(
    {
      email,
    },
    "SECRET_KEY",
    {
      expiresIn: "24h",
    }
  );

  return res.json({
    token: token,
  });
});

// DBのユーザーを確認するAPI
router.get("/allUsers", (req, res) => {
  return res.json(User);
});

module.exports = router;
