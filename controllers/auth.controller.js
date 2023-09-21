const JWT = require('jsonwebtoken')
const Admin = require('../models/admin.model')
const bcrypt = require('bcrypt')
const sequelize = require('../database')

exports.registerAdmin = async (req,res) => {
    try {
        await sequelize.sync();
        
        const { fullName, email, password } = req.body;
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        if (hashedPassword) {
          const admin = await Admin.create({
            fullName: fullName,
            email: email,
            password: hashedPassword,
          });
    
          res.status(201).json({
            status: "success",
            data: admin,
          });
        }

} catch (error) {
    res.status(400).json({
        status: 'failed',
        data: error
    })
}
}

exports.loginAdmin = async (req,res) => {
    try {
    const {email,password} = req.body;
    await sequelize.sync()
    const admin = await Admin.findOne({
        where: {
            email: email
        }
    })

    const decryptedPassword = await bcrypt.compare(password, admin.password);
  
    if (decryptedPassword) {
      const accessToken = JWT.sign(
        {
          isAdmin: admin.isAdmin,
          id: admin.id,
          email: admin.email
        },
        process.env.JWT_SEC,
        { expiresIn: "1d" }
      );

      res.status(201).json({
        status: "success",
        data: admin,
        token: accessToken,
      });

    } else {
      res.status(400).json({
        status: "failed",
        message: "password incorrect",
      });
    }


} catch (error) {
    res.status(400).json({
        status: 'failed',
        data: error
    })
}
}
    
 exports.resetPassword = async (req,res) => {
    const {email,password} = req.body;
   try {
    await sequelize.sync()
    const admin = await Admin.findOne({
        where: {
            email: email
        }
    })
    if(admin.email === email) {
         await Admin.update({
            password: password
        },{
            where: {
                email: email
            }
        })
        res.status(201).json({
            status: "success",
            message: "password successfully changed"
        })
    }
   } catch (error) {
    res.status(400).json({
        status: "failed",
        error: "check email properly"
    })
   }
}


const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(authHeader) {
        const token = authHeader.split(' ')[1]
    
        JWT.verify(token,process.env.JWT_SEC,(err,user) => {
            if(err) return res.status(401).json({status: 'failed',message: 'unauthorised user',error: err});
            req.user = user;
            next()
        })
    }else {
          res.status(403).json({
            status: 'failed',
            message: "not an authorised user"
          })
    }
}

exports.authorisedAdmin = (req, res, next) => {
    verifyToken(req,res,() => {
        if(req.user.isAdmin) {
          next()
        }else {
            res.status(403).json({
                status: 'failed',
                message: 'authorisation failed'
            })
        }
    })
}
