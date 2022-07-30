const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const {User} = require("../db/User");

router.get("/", (req, res) => {
  res.send("Hello Auth!");
});

// ユーザー新規登録用のAPI
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  (req, res) => {
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
});

module.exports = router;
