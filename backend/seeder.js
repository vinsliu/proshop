const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Order = require("./models/orderModel");
const products = require("./data/products");

dotenv.config();

connectDB();

const testUser = {
  name: "Utilisateur Test",
  email: "test@example.com",
  password: "123456",
};

const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const createdUser = await User.create(testUser);

    await Product.insertMany(products);

    console.log("Données importées avec succès");
    console.log(`Utilisateur de test créé : ${createdUser.email}`);
    process.exit();
  } catch (error) {
    console.error(`Erreur import : ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log("Données supprimées avec succès");
    process.exit();
  } catch (error) {
    console.error(`Erreur suppression : ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
