const mongoose = require("mongoose"); // Importing Mongoose library for MongoDB interaction

// Schema for an individual item within an order
const orderItemSchema = mongoose.Schema({
  name: { type: String, required: true }, // Name of the product, required
  qty: { type: Number, required: true }, // Quantity of the product, required
  image: { type: String, required: true }, // Image URL of the product, required
  price: { type: Number, required: true }, // Price of the product, required
  product: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Product model using ObjectId
    ref: "Product", // 'Product' model being referenced
    required: true, // This reference is required
  },
});

// Main schema for an order
const orderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model using ObjectId
      required: true, // The user is required for the order
      ref: "User", // 'User' model being referenced
    },
    orderItems: [orderItemSchema], // Array of items in the order, each following orderItemSchema
    shippingAddress: { 
      address: { type: String, required: true }, // Shipping address field, required
      city: { type: String, required: true }, // City for shipping, required
      postalCode: { type: String, required: true }, // Postal code for shipping, required
      country: { type: String, required: true }, // Country for shipping, required
    },
    paymentMethod: { 
      type: String, 
      required: true, // Payment method is required
      default: "Paypal", // Default payment method is Paypal
    },
    paymentResult: { 
      id: { type: String }, // Payment result ID
      status: { type: String }, // Status of the payment
      updated_time: { type: String }, // Last update time for the payment
      email_address: { type: String }, // Email associated with the payment
    },
    taxPrice: {
      type: Number,
      required: true, // Tax price is required
      default: 0.0, // Default value is 0
    },
    shippingPrice: {
      type: Number,
      required: true, // Shipping price is required
      default: 0.0, // Default value is 0
    },
    totalPrice: {
      type: Number,
      required: true, // Total price is required
      default: 0.0, // Default value is 0
    },
    isPaid: {
      type: Boolean,
      required: true, // Indicates if the order is paid, required
      default: false, // Default is not paid (false)
    },
    paidAt: {
      type: Date, // Date when the order was paid
    },
    isDelivered: {
      type: Boolean,
      required: true, // Indicates if the order is delivered, required
      default: false, // Default is not delivered (false)
    },
    deliveredAt: {
      type: Date, // Date when the order was delivered
    },
  },
  { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' fields
);

// Exporting the Order model, using orderSchema, to interact with 'orders' collection in MongoDB
module.exports = mongoose.model("Order", orderSchema);