const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const Listing = require('./models/listing');
const Mongo_URL = 'mongodb://127.0.0.1:27017/stayeasy';
const ejsMate = require('ejs-mate');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

main()
.then(() => console.log('Database connected'))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(Mongo_URL);
}

app.get('/', (req, res) => {
    res.redirect('/listings');
});

app.get('/listings', (req, res) => {
    Listing.find()
        .then(listings => {
            res.render('listings/index', { listings });
        })
        .catch(err => console.log(err));
});
app.get('/listings/new', (req, res) => {
    res.render('listings/new');
})
app.post('/listings', async(req, res) => {
    const listing = await Listing.create(req.body);
    res.redirect(`/listings`);
})
app.delete('/listings/:id', async(req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
})
app.get('/listings/:id/edit', async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit', { listing });
})
app.put('/listings/:id', async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/listings/${listing._id}`);
})
app.get('/listings/:id', async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/show', { listing });
})
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});