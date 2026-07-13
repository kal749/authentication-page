const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend working!' });
});


app.get('/api/signup', (req, res) => {
    const { name, email, phonenumber, password } = req.query;

    try {
        db.exec(`
            INSERT INTO users (name, email, phonenumber, password)
            VALUES ('${name}', '${email}', '${phonenumber}', '${password}')
        `);
        res.send('User registered successfully!');
    } catch (error) {
        res.status(400).send(error.message);
    }
});


app.get('/api/login', (req, res) => {
    const { phonenumber, password } = req.query;

    try {
       
        const stmt = db.prepare(`SELECT * FROM users WHERE phonenumber = ? AND password = ?`);
        const user = stmt.get(phonenumber, password);
        
        console.log('User found:', user);

        if (!user) {
            return res.json({ error: 'Invalid phone or password' });
        }

        delete user.password;
        res.json(user);
    } catch (error) {
        console.log('Error:', error.message);
        res.json({ error: error.message });
    }
});


app.get('/api/users', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM users');
        const users = stmt.all();
        res.json(users);
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});