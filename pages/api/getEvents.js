import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
      
      if (req.method === "GET") {
        let events = [];
        const response = await fetch(process.env.EVENTURL, {
          method: "GET",
          headers: {
            authorization: `Bearer ${process.env.STRAPI_API_KEY}`
          }
        });
        const data = await response.json();
        return res.status(200).json({ success: true, data: data?.data}); // Added return statement
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } else {
    res.status(405).json({ message: "Not authorized" });
  }
}

export default handler;
