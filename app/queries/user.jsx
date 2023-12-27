import { Client, Databases } from "appwrite";
import { ID } from "appwrite";
import { Query } from "appwrite";

const client = new Client();
const databases = new Databases(client);
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const getUserByEmail = async (email) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_ID,
      [Query.equal("email", email)]
    );
    return response.documents[0];
  } catch (error) {
    console.log(error);
  }
};
const saveUser = async (
  name,
  user_id,
  picture,
  email,
  status,
  last_payment,
  recent_boards
) => {
  try {
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_ID,
      ID.unique(),
      {
        name: name,
        user_id: user_id,
        picture: picture,
        email: email,
        status: status,
        last_payment: last_payment,
        recent_boards: recent_boards,
      }
    );
    console.log("User saved successfully");
  } catch (error) {
    console.log(error);
  }
};

const updateRecentBoards = async (user_id, boards) => {
  try {
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_ID,
      user_id,
      {
        recent_boards: boards,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export { getUserByEmail, saveUser, updateRecentBoards };
