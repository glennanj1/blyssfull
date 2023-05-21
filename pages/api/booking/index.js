import mongoose from "mongoose";
import Transaction from "../../../Models/Transaction.js"; // Path to your transaction model
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
// Connect to your MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    if (req.method === "POST") {
      const transactionData = req.body;
      try {
        const newTransaction = new Transaction(transactionData);
        console.log(newTransaction);
        const savedTransaction = await newTransaction.save();
        console.log(savedTransaction);
        res.status(200).json(savedTransaction._id);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to save transaction", error });
      }
    } else if (req.method === "GET") {
      const bookings = await Transaction.find({ userId: session.id });
          return res.status(200).json({ success: true, data: bookings }); // Added return statement
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } else {
    res.status(405).json({ message: "Not authorized" });
  }
}

export default handler;
