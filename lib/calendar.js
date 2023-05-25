import { google } from "googleapis";

const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

const jwtClient = new google.auth.JWT(clientEmail, null, privateKey, [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
], "john@techbridge.dev");

const calendar = google.calendar({ version: "v3", auth: jwtClient });



async function mailAdmin (body, subject, appointment) {
console.log('mailing');
const transporter = nodemailer.createTransport({
    host: process.env.host,
    port: 587,
    auth: {
    user: process.env.user, // generated ethereal user
    pass: process.env.pass, // generated ethereal password
    },
});
const mailData = {
    from: process.env.user,
    to: process.env.ADMIN_EMAIL,
    subject: subject,
    text: body,
    attachments: [
        {   // file on disk as an attachment
            filename: 'event',
            path: `/tmp/${appointment._id}.ics` // stream this file
        },
        {   // filename and content type is derived from path
            path: `/tmp/${appointment._id}.ics`
        },
    ],
}
await transporter.sendMail(mailData).catch(e => console.log(e));
console.log('success');
}

async function calendarCall (start, end, summary, description, attendee) {
    console.log(start, end, summary, description, attendee)
      let requestId = new Date().valueOf();
      try {
        const event = {
          summary: description,
          description: summary,
          start: {
            dateTime: start,
          },
          end: {
            dateTime: end,
          },
          attendees: [
            { email: attendee },
          ],
          visibility: 'public', // make this event public
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 60 },
              { method: "popup", minutes: 30 },
            ],
          },
          organizer: {
            // process.env.ADMIN_EMAIL
            email: process.env.ADMIN_EMAIL,  // the user who should be listed as the organizer
          },
          conferenceData: {
            createRequest: {

              requestId: requestId, // unique request ID for this call
              conferenceSolutionKey: {
                type: "hangoutsMeet", // for creating a Google Meet conference
              },
              status: {
                statusCode: "success",
              },
            },
          },
        };
  
        const calendarId = process.env.CALENDAR_ID;
        const createdEvent = await calendar.events.insert({
          calendarId: calendarId,
          conferenceDataVersion: 1,
          resource: event,
          sendUpdates: 'all'
        });
        console.log(createdEvent.data);
  
        const meetLink = createdEvent.data.hangoutLink;
        const calendarLink = createdEvent.data.htmlLink;
    
        return {
          meetLink: meetLink,
          calendarLink: calendarLink,
        };
      } catch (error) {
        console.log({ error: "Failed to create event >>" + error });
        return null;
      }
};

module.exports = {
    // mail,
    mailAdmin,
    calendarCall
}