const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req,res)=>{
  const {name,email,password} = req.body;

  const hash = await bcrypt.hash(password,10);

  db.query(
    'INSERT INTO users(name,email,password) VALUES(?,?,?)',
    [name,email,hash],
    (err,result)=>{
      if(err) return res.status(500).json(err);
      res.json({message:'User Registered'});
    }
  );
};
exports.profile = (req,res,decoded)=>{

    db.query(
        'SELECT id,name,email FROM users WHERE id=?',
        [decoded.id],
        (err,result)=>{

            if(err){
                return res.status(500).json({msg:'DB Error'});
            }

            if(result.length===0){
                return res.status(404).json({msg:'User not found'});
            }

            res.json(result[0]);
        }
    );

};
exports.login = (req,res)=>{
  const {email,password} = req.body;

  db.query(
    'SELECT * FROM users WHERE email=?',
    [email],
    async (err,result)=>{
      if(err || result.length===0)
        return res.status(401).json({msg:'User not found'});

      const user = result[0];

      const match = await bcrypt.compare(password,user.password);

      if(!match)
        return res.status(401).json({msg:'Wrong password'});

      const token = jwt.sign(
        {id:user.id,email:user.email},
        'stocksecret',
        {expiresIn:'7d'}
      );

      res.json({token,user});
    }
  );
};
