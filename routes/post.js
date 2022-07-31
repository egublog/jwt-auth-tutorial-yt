const router = require("express").Router();
const {publicPosts, privatePosts} = require("../db/Post");
const JWT = require("jsonwebtoken");
const checkJWT = require("../middleware/checkJWT");

// 誰でもみれる記事閲覧用のAPI
router.get("/public", (req, res) => {
  return res.json(publicPosts);
});

// JWTを持っている人だけ閲覧できるAPI
router.get("private", checkJWT, (req, res) => {
  return res.json(privatePosts);
});

module.exports = router;