const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

let jwtSecret;
if (process.env.NODE_ENV === 'production') {
  jwtSecret = process.env.JWT_SECRET;
} else {
  jwtSecret = require('../config/config').JWT_SECRET;
}

const Admin = require('../models/Admin');

// Get logged in admin
// Private
router.get('/', auth, async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        res.json(admin);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Log in an admin
// Public
router.post('/', async(req, res) => {
    let errors = false;
    const {username, password} = req.body;

    if (username == '') {
        errors = true;
    }
    if (password === '') {
        errors = true;
    }
    if (errors) {
        return res.status(400).send("Dados inválidos.");
    }


    try {
        let admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(400).send("Dados inválidos.");
        };

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).send("Dados inválidos.");
        }

        const payload = {
            admin: {
                id: admin._id
            }
        }

        jwt.sign(payload, jwtSecret, {expiresIn: 21600}, (err, token) => {
            if (err) throw err;
            res.json({token});
        } )
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


 // Register an admin
 // Out of reach
 router.post('/register', async(req, res) => {
     const {username, password} = req.body;

     try {
         admin = new Admin({
             username,
             password
         });

         const salt = await bcrypt.genSalt();

         admin.password = await bcrypt.hash(password, salt);

         await admin.save();

         res.json("Usuário registrado com sucesso.")
     } catch(err) {
         console.error(err.message);
         res.status(500).send('Server Error')
     }
 });

 module.exports = router;