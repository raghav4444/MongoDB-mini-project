const express = require('express');
const app = express();

const User = require('./models/user');

const path = require('path');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/read', async (req, res) => {
    res.render('read', { users: await User.find() });
});

app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;
    let createduser = await User.create({
        name,
        email,
        image 
    });
    res.redirect('/read');
});

app.get('/delete/:id', async (req, res) => {
    let { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/read');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});