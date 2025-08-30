const mongoose = require('mongoose');
const Listing = require('../models/listing');
const { data } = require('./data');
main()
.then(() => console.log('Database connected'))
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/stayeasy');
    
}
const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(data);
}
initDB();