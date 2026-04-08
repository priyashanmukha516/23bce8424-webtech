// server.js
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// 1. Connect to MongoDB using Mongoose
const MONGODB_URI = "mongodb://127.0.0.1:27017/crudDB"; // local DB

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB connection error:", err));

// 2. Define a schema with Mongoose
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 3. Create a model from the schema
const Item = mongoose.model("Item", itemSchema);

// 4. CRUD API routes using async/await

// CREATE single item
app.post("/items", async (req, res) => {
  try {
    const { name, description } = req.body;
    const item = new Item({ name, description }); // using save()
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// CREATE multiple items at once (using create())
app.post("/items/bulk", async (req, res) => {
  try {
    const items = req.body; // array of { name, description }
    const savedItems = await Item.create(items);
    res.status(201).json(savedItems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one item by ID
app.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE one item (using findByIdAndUpdate)
app.put("/items/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE using updateOne
app.patch("/items/:id", async (req, res) => {
  try {
    const result = await Item.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Updated", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE one item (using findByIdAndDelete)
app.delete("/items/:id", async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted", deleted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE using deleteOne
app.delete("/items", async (req, res) => {
  try {
    const result = await Item.deleteOne({ name: req.body.name });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No item with that name found" });
    }
    res.json({ message: "Item deleted by name", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});