const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello Auth!');
});

module.exports = router;