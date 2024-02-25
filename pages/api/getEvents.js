import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  // fix this after dev
  if (!session) {
      
      if (req.method === "GET") {
        let events = [];
        const response = await fetch(process.env.EVENTURL, {
          method: "GET",
          headers: {
            authorization: `Bearer ${STRAPI_API_KEY}`
          }
        });
        const data = await response.json();
        events = data.event_types;
        console.log(events);
        return res.status(200).json({ success: true, data: {events}}); // Added return statement
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } else {
    res.status(405).json({ message: "Not authorized" });
  }
}

export default handler;
