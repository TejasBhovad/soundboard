import { Client, Databases } from "appwrite";
import { ID } from "appwrite";
import { Query } from "appwrite";

const client = new Client();
const databases = new Databases(client);
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const saveBoard = async (
  name,
  creator,
  logo,
  visibility,
  board_id,
  total_plays
) => {
  try {
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BOARDS_ID,
      ID.unique(),
      {
        name,
        // creator: data.documents[0].$id,
        creator,
        logo,
        visibility,
        board_id,
        total_plays,
      }
    );
    console.log("Board saved successfully");
  } catch (error) {
    console.log(error);
  }
};

const getBoardById = async (board_id) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BOARDS_ID,
      [Query.equal("board_id", board_id)]
    );
    return response.documents[0];
  } catch (error) {
    console.log(error);
  }
};

const getBoardsByCreator = async (creator) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BOARDS_ID,
      [Query.equal("creator", creator)]
    );
    return response.documents;
  } catch (error) {
    console.log(error);
  }
};

const updateRecentBoardAndTotalPlays = async (board_id, recent_board_id) => {
  try {
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_ID,
      board_id,
      {
        recent_board_id,
        total_plays: total_plays + 1,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
const updateBoard = async (board_id, name, logo, visibility) => {
  try {
    const response = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_BOARDS_ID,
      board_id,
      {
        name,
        logo,
        visibility,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export {
  saveBoard,
  getBoardById,
  getBoardsByCreator,
  updateBoard,
  updateRecentBoardAndTotalPlays,
};
