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
    // log all the data
    console.log(
      "name: " +
        name +
        "\n" +
        "user_id: " +
        user_id +
        "\n" +
        "picture: " +
        picture +
        "\n" +
        "email: " +
        email +
        "\n" +
        "status: " +
        status +
        "\n" +
        "last_payment: " +
        last_payment +
        "\n" +
        "recent_boards: " +
        recent_boards +
        "\n"
    );
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
export { getUserByEmail, saveUser };
