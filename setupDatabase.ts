import 'dotenv/config';
import { Client, Databases } from 'appwrite';

console.log('Starting setupDatabase.ts');
console.log('Node version:', process.version);
console.log('VITE_APPWRITE_ENDPOINT:', process.env.VITE_APPWRITE_ENDPOINT);
console.log('VITE_APPWRITE_PROJECT:', process.env.VITE_APPWRITE_PROJECT);

// Read environment variables
const endpoint = process.env.VITE_APPWRITE_ENDPOINT;
const project = process.env.VITE_APPWRITE_PROJECT;

if (!endpoint || !project) {
  console.error('Missing Appwrite endpoint or project ID. Please set VITE_APPWRITE_ENDPOINT and VITE_APPWRITE_PROJECT.');
  process.exit(1);
}

const client = new Client();
client.setEndpoint(endpoint).setProject(project);
const databases = new Databases(client);

const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE;

if (!DATABASE_ID) {
  console.error('Missing Appwrite database ID. Please set VITE_APPWRITE_DATABASE in your .env file.');
  process.exit(1);
}

// Helper: Ensure collection exists or create it
async function ensureCollection(id: string, name: string) {
  try {
    await databases.createCollection(DATABASE_ID, id, name);
    console.log(`Created collection '${id}'.`);
  } catch (e: any) {
    if (e.code === 409) {
      console.log(`Collection '${id}' already exists.`);
    } else {
      console.error(`Error creating collection '${id}':`, e);
    }
  }
}

// Helper: Ensure attribute exists or create it
async function ensureAttribute(collectionId: string, key: string, type: string, required: boolean, defaultValue?: any, options: any = {}) {
  try {
    let res;
    switch (type) {
      case 'string':
        res = await databases.createStringAttribute(DATABASE_ID, collectionId, key, 255, required, defaultValue, options.array || false, options.enumValues);
        break;
      case 'integer':
        res = await databases.createIntegerAttribute(DATABASE_ID, collectionId, key, required, defaultValue);
        break;
      case 'boolean':
        res = await databases.createBooleanAttribute(DATABASE_ID, collectionId, key, required, defaultValue);
        break;
      case 'string[]':
        res = await databases.createStringAttribute(DATABASE_ID, collectionId, key, 255, required, defaultValue, true);
        break;
      default:
        throw new Error(`Unsupported attribute type: ${type}`);
    }
    console.log(`Created attribute '${key}' in '${collectionId}'.`);
  } catch (err: any) {
    if (err.code === 409) {
      console.log(`Attribute '${key}' in '${collectionId}' already exists.`);
    } else {
      console.error(`Error creating attribute '${key}' in '${collectionId}':`, err);
    }
  }
}

// Helper: Ensure index exists or create it
async function ensureIndex(collectionId: string, key: string, type: string, attributes: string[], orders?: string[]) {
  try {
    await databases.createIndex(DATABASE_ID, collectionId, key, type, attributes, orders);
    console.log(`Created index '${key}' in '${collectionId}'.`);
  } catch (err: any) {
    if (err.code === 409) {
      console.log(`Index '${key}' in '${collectionId}' already exists.`);
    } else {
      console.error(`Error creating index '${key}' in '${collectionId}':`, err);
    }
  }
}

async function main() {
  // USERS
  await ensureCollection('users', 'users');
  await ensureAttribute('users', 'name', 'string', true);
  await ensureAttribute('users', 'email', 'string', true);
  await ensureAttribute('users', 'avatar', 'string', false);
  await ensureAttribute('users', 'createdAt', 'integer', true);
  await ensureAttribute('users', 'bio', 'string', false);
  await ensureAttribute('users', 'isActive', 'boolean', true, true);
  await ensureAttribute('users', 'reputation', 'integer', false, 0);
  await ensureAttribute('users', 'role', 'string', false, 'user');

  // QUESTIONS
  await ensureCollection('questions', 'questions');
  await ensureAttribute('questions', 'title', 'string', true);
  await ensureAttribute('questions', 'description', 'string', true);
  await ensureAttribute('questions', 'tags', 'string[]', false);
  await ensureAttribute('questions', 'userId', 'string', true);
  await ensureAttribute('questions', 'upvotes', 'integer', false, 0);
  await ensureAttribute('questions', 'downvotes', 'integer', false, 0);
  await ensureAttribute('questions', 'views', 'integer', false, 0);
  await ensureAttribute('questions', 'acceptedAnswer', 'string', false);
  await ensureAttribute('questions', 'isActive', 'boolean', false, true);
  await ensureIndex('questions', 'userId_createdAt', 'key', ['userId', 'createdAt'], ['ASC', 'ASC']);

  // ANSWERS
  await ensureCollection('answers', 'answers');
  await ensureAttribute('answers', 'questionId', 'string', true);
  await ensureAttribute('answers', 'userId', 'string', true);
  await ensureAttribute('answers', 'content', 'string', true);
  await ensureAttribute('answers', 'upvotes', 'integer', false, 0);
  await ensureAttribute('answers', 'downvotes', 'integer', false, 0);
  await ensureAttribute('answers', 'isAccepted', 'boolean', false, false);
  await ensureAttribute('answers', 'createdAt', 'integer', true);
  await ensureAttribute('answers', 'parentId', 'string', false);
  await ensureIndex('answers', 'questionId_createdAt', 'key', ['questionId', 'createdAt'], ['ASC', 'ASC']);

  // VOTES
  await ensureCollection('votes', 'votes');
  await ensureAttribute('votes', 'userId', 'string', true);
  await ensureAttribute('votes', 'targetId', 'string', true);
  await ensureAttribute('votes', 'targetType', 'string', true);
  await ensureAttribute('votes', 'voteType', 'string', true);
  await ensureIndex('votes', 'targetId_voteType', 'key', ['targetId', 'voteType'], ['ASC', 'ASC']);

  // NOTIFICATIONS
  await ensureCollection('notifications', 'notifications');
  await ensureAttribute('notifications', 'userId', 'string', true);
  await ensureAttribute('notifications', 'type', 'string', true);
  await ensureAttribute('notifications', 'message', 'string', true);
  await ensureAttribute('notifications', 'isRead', 'boolean', false, false);
  await ensureAttribute('notifications', 'relatedId', 'string', false);
  await ensureAttribute('notifications', 'actionUrl', 'string', false);
  await ensureAttribute('notifications', 'createdAt', 'integer', true);
}

main().then(() => {
  console.log('Database setup complete.');
  process.exit(0);
}).catch((err) => {
  console.error('Database setup failed:');
  console.error('As string:', String(err));
  try {
    console.error('As JSON:', JSON.stringify(err, null, 2));
  } catch (jsonErr) {
    console.error('Could not stringify error:', jsonErr);
  }
  console.error('Full object:', err);
  process.exit(1);
}); 