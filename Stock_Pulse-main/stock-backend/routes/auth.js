const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const jwt = require('jsonwebtoken');

router.post('/register', auth.register);
router.post('/login', auth.login);

router.get('/profile', (req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({msg:"No token"});
    }

    jwt.verify(token, 'stocksecret', (err, decoded)=>{
        if(err){
            return res.status(401).json({msg:"Invalid token"});
        }

        auth.profile(req,res,decoded);
    });
});

module.exports = router;
