import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.apikey);

export const sendReminderEmail = functions.firestore
  .document("users/{userId}/tasks/{taskId}")
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const previousData = change.before.data();

    if (newData && newData.date !== previousData.date) {
      // Only send the reminder email if the task date is changed
      const userId = context.params.userId;
      const userSnapshot = await admin.firestore().doc(`users/${userId}`).get();
      const user = userSnapshot.data();

      if (user && user.email) {
        const { title, date } = newData;
        const taskDateTime = new Date(date);
        const reminderDateTime = new Date(
          taskDateTime.getTime() - 30 * 60 * 1000
        ); // 30 minutes before the task

        const msg = {
          to: user.email,
          from: "your-sender-email@example.com",
          subject: `Reminder: Task "${title}" in 30 minutes`,
          text: `You have a task "${title}" scheduled on ${date}.`,
          html: `<p>You have a task "${title}" scheduled on ${date}.</p>`,
        };

        try {
          await sgMail.send(msg);
          console.log(`Reminder email sent to ${user.email}`);
        } catch (error) {
          console.error("Error sending reminder email:", error);
        }
      }
    }

    return null;
  });
