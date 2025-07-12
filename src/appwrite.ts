import { Client, Account, Databases } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT!) // Your Appwrite endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT!); // Your project ID

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
