import mongoose from "mongoose";
import Transaction from "../../../Models/Transaction.js"; // Path to your transaction model
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { calendarCall } from "@/lib/calendar.js";
// Connect to your MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

let services = [
  {
    "label": "$55.00",
    "description": "30 Minute Distance Reiki Session",
    "summary": "In a distance, one on one reiki session, we dive into the divine healing of reiki. Reiki helps us physically, mentally, & spiritually, release any blockages we may have while relaxing your body & mind effortlessly. Reiki is energy work that’s designed for mostly everyone! Allow me to be a vessel for reiki to provide to you the most loving healing. Before a 30 min session, we briefly discuss why you decided to book with us, what you would like to get out of it & a simple one card pull (tarot or oracle)"
  },
  {
    "label": "$111.00",
    "description": "1 Hour Distance Reiki Sessions",
    "summary": "In a distance, one on one reiki session, we dive into the divine healing of reiki. Reiki helps us physically, mentally, & spiritually, release any blockages we may have while relaxing your body & mind effortlessly. Reiki is energy work that’s designed for mostly everyone! Allow me to be a vessel for reiki to provide to you the most loving healing. Depending on your needs, I provide sound healing, card pulls, crystals, chakra work, etc. Before a session, we talk a bit about why you decided to book, what you would like to get out of our session & discuss any and all healing modalities we’re comfortable using."
  },
  {
    "label": "$33.00",
    "description": "30 minute Distance Tarot Readings",
    "summary": "In a Tarot reading session, we use the cards to speak & I interpret. Come to session with an intention, guidance or if you’re just curious what the Tarot is like, just come as you are. We accept all here! Accompanied with at least one oracle card to end."
  },
  {
    "label": "$33.00",
    "description": "30 minute Distance Oracle Reading",
    "summary": "With an oracle read, this is if you are wanting something more empowering & uplifting. More of an affirmation based card pull. We focus on a specific area of your journey & pull around that topic."
  },
  {
    "label": "$22.00",
    "description": "15 minute Distance Oracle Reading",
    "summary": "With an oracle read, this is if you are wanting something more empowering & uplifting. More of an affirmation based card pull. We focus on a specific area of your journey & pull around that topic. 1-2 card pull."
  },
  {
    "label": "$0.00",
    "description": "Introductory Session",
    "summary": "Meet and Greet session with the owner and operator Alyssa Trindle."
  }
]

async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    console.log(session);
    if (req.method === "POST") {
      const transactionData = req.body;
      try {
        console.log(transactionData);
        let startTime = transactionData.date;
        let endTime = new Date(transactionData.date);
        console.log('end time line 50 ' + endTime)
        // get the session length and break the string
        let length;
        let summary;

        if (transactionData?.desc.split(' ')[0] === '30') {
            length = 30;
        } else if (transactionData?.desc.split(' ')[0] === '1') {
            length = 60;
        } else if (transactionData?.desc.split(' ')[0] === '15') {
            length = 15;
        } else if (transactionData?.desc.split(' ')[0] === 'Introductory') {
          length = 15;
        }

        services.map(e => {
          if (e.description === transactionData.desc) {
            summary = e.summary;
          }
        })

        // end time stripped desc + time
        endTime.setMinutes(endTime.getMinutes() + length);

        const { meetLink, calendarLink } = await calendarCall(startTime, endTime, summary, transactionData.desc, session.user.email);
        // Include meetLink and calendarLink in new transaction
        transactionData.meetLink = meetLink;
        transactionData.calendarLink = calendarLink;

        const newTransaction = new Transaction(transactionData);
        const savedTransaction = await newTransaction.save();

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
