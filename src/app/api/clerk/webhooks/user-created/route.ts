// import { Webhook } from "svix"
// import { headers } from "next/headers"
// import { WebhookEvent } from "@clerk/nextjs/server"
// import prisma from "@/lib/prisma"
// import { Prisma } from "@prisma/client"

// interface UserJSON {
//     username: string | null;
//     first_name: string | null;
//     last_name: string | null;
//     image_url: string;
//     email_addresses: {
//         email_address: string;
//     }[];
// }
// export async function POST(req: Request) {

//     if (!evt.data) {
//         return new Response("No event data found", { status: 400 })
//     }

//     const id: string = evt.data.id!
//     const email: string = (evt.data as UserJSON).email_addresses[0].email_address
//     const eventType = evt.type
//     const username = (evt.data as UserJSON).username || email
//     const firstName = (evt.data as UserJSON).first_name
//     const lastName = (evt.data as UserJSON).last_name
//     const name = (`${firstName ?? ''} ${lastName ?? ''}`).trim() || username;
//     const profilePicture = (evt.data as UserJSON).image_url

//     if (eventType === "user.created") {
//         try {
//             if (!email || !id || !username) {
//                 return new Response("Missing required data for user creation", { status: 400 })
//             }

//             const newUser = await prisma.user.create({
//                 data: {
//                     id,
//                     email,
//                     name: name,
//                     username: username,
//                     profilePicture,
//                 } as unknown as Prisma.UserCreateInput
//             });

//             console.log("new user created", newUser)
//         } catch (error) {
//             console.error("error creating user", error)
//             return new Response("Error creating user: ", { status: 500 })
//         }
//     }
//     return new Response("Webhook received", { status: 200 })
// }

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { UserJSON as DefaultUserJSON } from "@clerk/nextjs/server";

interface UserJSON extends DefaultUserJSON {
  birthday: string | null;
  gender: string | null;
}

export async function POST(req: Request) {
  const CLERK_WEBHOOK_SECRET_KEY = process.env.CLERK_WEBHOOK_SECRET_KEY;

  if (!CLERK_WEBHOOK_SECRET_KEY) {
    throw new Error(
      "Error: Please add CLERK_WEBHOOK_SECRET_KEY from Clerk Dashboard to .env or .env.local",
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(CLERK_WEBHOOK_SECRET_KEY);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console

  // Extract user data
  const { id } = evt.data;
  const user = evt.data as UserJSON;
  const email = user.email_addresses[0]?.email_address || "No email provided";
  const username = user.username || email;
  const firstName = user.first_name || "Unknown";
  const lastName = user.last_name || "Unknown";
  const name = `${firstName} ${lastName}`.trim() || username;
  const profilePicture = user.image_url || "No image URL provided";
  const birthday = user.birthday || "Not provided";
  const createdAt = user.created_at || "Unknown";
  const gender = user.gender || "Not provided";
  const externalId = user.external_id || "Not provided";
  const lastSignInAt = user.last_sign_in_at;

  // Extract event attributes
  const eventAttributes = payload.event_attributes || {};
  const clientIp = eventAttributes.http_request?.client_ip || "Unknown IP";
  const userAgent = eventAttributes.http_request?.user_agent || "Unknown User-Agent";

  console.log("User Information:");
  console.log(`- ID: ${id}`);
  console.log(`- Email: ${email}`);
  console.log(`- Username: ${username}`);
  console.log(`- Name: ${name}`);
  console.log(`- Profile Picture: ${profilePicture}`);
  console.log(`- Birthday: ${birthday}`);
  console.log(`- Created At: ${createdAt}`);
  console.log(`- Gender: ${gender}`);
  console.log(`- External ID: ${externalId}`);
  console.log(
    `- Last Sign-In At: ${lastSignInAt ? new Date(lastSignInAt).toISOString() : "Unknown"}`,
  );

  console.log("Event Attributes:");
  console.log(`- Client IP: ${clientIp}`);
  console.log(`- User-Agent: ${userAgent}`);

  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", body);

  return new Response("Webhook received", { status: 200 });
}
