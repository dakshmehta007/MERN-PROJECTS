
const mongoose = require('mongoose');
const mongooseURI = 'mongodb+srv://dakfood:%40dakfood4651@dakfood.rynmzag.mongodb.net/dakfoodmern?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongooseURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

        global.food_items = fetched_data;
        global.foodCategory = foodCategory;

        // console.log("Fetched data:", fetched_data);
        // console.log("Fetched categories:", foodCategory);

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = mongoDB;
//Hello daksh