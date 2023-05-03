import mongoose from "mongoose";
import Transaction from "../../Models/Transaction.js"; // Path to your transaction model
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
// Connect to your MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (req.method !== "POST") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }
    const { reqDate } = req.body;
    console.log('req date >> ' + reqDate);

    const startOfDay = new Date(reqDate);
    startOfDay.setHours(0, 0, 0, 0);
    console.log('start' + startOfDay);

    const endOfDay = new Date(reqDate);
    endOfDay.setHours(23, 59, 59, 999);
    console.log('end' + endOfDay);

    const transactions = await Transaction.find({
      date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    console.log('t length >> ' + transactions.length)
    console.log('t length >> ' + JSON.stringify(transactions))

    // for each of the transactions
    console.log('req date >>' + reqDate); 
    const isWithinTimeSlots = transactions.some(t => {
        console.log('desc >>>>>>>>>>>>' + t.desc);
        let rDate = new Date(reqDate);
        // get datetime
        let startTime = t.date;
        let endTime = new Date(t.date);
        // get the session length and break the string
        let length;
        if (t.desc.split(' ')[0] === '30') {
            length = 31;
        } else if (t.desc.split(' ')[0] === '1') {
            length = 61;
        } else if (t.desc.split(' ')[0] === '15') {
            length = 16;
        }
        // end time stripped desc + time
        endTime.setMinutes(endTime.getMinutes() + length);

        console.log('t or f > ')
        console.log(reqDate >= startTime && reqDate <= endTime);
        console.log('req date >>>>> ' + rDate);
        console.log('s date >>>>> ' + startTime);
        console.log('e date >>>>> ' + endTime);

        return (
            rDate >= startTime && rDate <= endTime
        );
    });

    console.log('time slot bool >> ' + isWithinTimeSlots);


    if (!reqDate) {
      res.status(400).json({
        message: "Bad request. Please provide date",
      });
      return;
    }

    try {
      res.status(200).json({ isWithinTimeSlots });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};

export default handler;
