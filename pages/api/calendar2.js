// import { google } from "googleapis";

// const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
// const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

// const jwtClient = new google.auth.JWT(clientEmail, null, privateKey, [
//   "https://www.googleapis.com/auth/calendar",
//   "https://www.googleapis.com/auth/calendar.events",
// ], "alyssa@blyssfullmagick.com");

// const calendar = google.calendar({ version: "v3", auth: jwtClient });

// export default async (req, res) => {
//   console.log(req.body);
//   if (req.method !== "POST") {
//     try {
//       const event = {
//         summary: `Testing out thasdfasdfaskhkjjkjkjdfasdfis new app bitch`,
//         description: "fuck ofasdfasdfasdajhhhjjhsdff bitch",
//         start: {
//           dateTime: "2023-05-01T10:00:00-07:00",
//         },
//         end: {
//           dateTime: "2023-05-01T11:00:00-07:00",
//         },
//         attendees: [
//           { email: "glennan.dev@gmail.com" },
//         ],
//         visibility: 'public', // make this event public
//         reminders: {
//           useDefault: false,
//           overrides: [
//             { method: "email", minutes: 60 },
//             { method: "popup", minutes: 30 },
//           ],
//         },
//         organizer: {
//           email: 'john@techbridge.dev',  // the user who should be listed as the organizer
//         },
//         conferenceData: {
//           createRequest: {
//             requestId: "12121222213452344", // unique request ID for this call
//             conferenceSolutionKey: {
//               type: "hangoutsMeet", // for creating a Google Meet conference
//             },
//             status: {
//               statusCode: "success",
//             },
//           },
//         },
//       };

//       const calendarId = process.env.CALENDAR_ID;
//       const createdEvent = await calendar.events.insert(
      
//         {
//         calendarId: calendarId,
//         conferenceDataVersion: 1,
//         resource: event,
//         sendUpdates: 'all'
//       });
//       console.log(createdEvent.data);

//       res.status(200).json({ meetingLink: createdEvent.data.htmlLink });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to create event" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// };
