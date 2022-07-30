const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello Auth!');
});

// ユーザー新規登録用のAPI
router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email, password);
});

module.exports = router;