// Import the required modules
import express from "express"; // Express is used to create a web server
import * as dotenv from "dotenv"; // dotenv is used to load environment variables from a .env file
import cors from "cors"; // CORS allows cross-origin requests (important for APIs)
import helmet from "helmet"; // Helmet helps secure the app by setting various HTTP headers

// Import route handlers for users and products
import { userRouter } from "./users/users.routes"; 
import { productRouter } from "./products/product.routes";

// Load environment variables from .env file
dotenv.config();

// Check if the PORT variable is defined in the .env file
if (!process.env.PORT) {
  console.log(`No port value specified...`); // Logs a message if PORT is missing
}

// Convert the PORT variable from string to number
const PORT = parseInt(process.env.PORT as string, 10);

// Create an Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Enable CORS to allow requests from different domains
app.use(cors());

// Use Helmet to enhance security by setting various HTTP headers
app.use(helmet());

// Set up routes for users and products
app.use('/', userRouter); // All user-related routes will be handled here
app.use('/', productRouter); // All product-related routes will be handled here

// Start the server and listen on the specified PORT
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`); // Logs a message when the server starts
});
