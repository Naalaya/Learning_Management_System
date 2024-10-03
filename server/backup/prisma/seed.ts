// {*You can generate database seed here*}

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   // Seed user data
//   const user1 = await prisma.user.create({
//     data: {
//       name: "John Doe",
//       email: "john@example.com",
//       emailVerified: new Date(),
//       image: "https://example.com/john.jpg",
//       accounts: {
//         create: [
//           {
//             type: "oauth",
//             provider: "google",
//             providerAccountId: "123456789",
//             access_token: "access_token_example",
//             refresh_token: "refresh_token_example",
//             expires_at: 1234567890,
//             token_type: "Bearer",
//             scope: "read",
//           },
//         ],
//       },
//       sessions: {
//         create: [
//           {
//             sessionToken: "session_token_example",
//             expires: new Date(Date.now() + 3600 * 1000), // 1 hour later
//           },
//         ],
//       },
//     },
//   });

//   const user2 = await prisma.user.create({
//     data: {
//       name: "Jane Doe",
//       email: "jane@example.com",
//       emailVerified: new Date(),
//       image: "https://example.com/jane.jpg",
//     },
//   });

//   // Seed authenticator data for user1
//   await prisma.authenticator.create({
//     data: {
//       credentialID: "credential_id_example",
//       userId: user1.id,
//       providerAccountId: "provider_account_id_example",
//       credentialPublicKey: "public_key_example",
//       counter: 1,
//       credentialDeviceType: "single_device",
//       credentialBackedUp: false,
//     },
//   });

//   console.log("Seeding finished.");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
