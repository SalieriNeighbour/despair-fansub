const express = require('express');
const router = express.Router();

const Contact = require('../models/Contact');

// Post contact
// Public
router.post('/', async (req, res) => {
    try {
        const {email, subject, content} = req.body;

        if (subject === '' || content === '' || email.match(/^[^\s@]+@[^\s@]+$/) == null){
            return res.status(400).send("Envio inválido.");
        }
        
        contact = new Contact({
            email,
            subject,
            content
        });

        await contact.save();

        res.json("Contato realizado com sucesso.")
    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }
});

module.exports = router;