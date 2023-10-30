const foodItems = require('../data');

// Get all food items
exports.getAllFoodItems = (req, res) => {
    res.json(foodItems);
};

// Get a single food item by ID
exports.getFoodItemById = (req, res) => {
    const id = parseInt(req.params.id);
    const foodItem = foodItems.find(item => item.id === id);
    if (foodItem) {
        res.json(foodItem);
    } else {
        res.status(404).send("Item not found.");
    }
};

// Add a new food item (You'd typically get data from req.body after parsing it with middleware like bodyParser)
exports.addFoodItem = (req, res) => {
    const newItem = {
        id: foodItems.length + 1, // simplistic way to auto-increment ID, use cautiously
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
    };
    foodItems.push(newItem);
    res.status(201).json(newItem);
};

// Update food item by ID
exports.updateFoodItemById = (req, res) => {
    const id = parseInt(req.params.id);
    const index = foodItems.findIndex(item => item.id === id);
    if (index !== -1) {
        foodItems[index] = { ...foodItems[index], ...req.body };
        res.json(foodItems[index]);
    } else {
        res.status(404).send("Item not found.");
    }
};

// Delete food item by ID
exports.deleteFoodItemById = (req, res) => {
    const id = parseInt(req.params.id);
    const index = foodItems.findIndex(item => item.id === id);
    if (index !== -1) {
        foodItems.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send("Item not found.");
    }
};
