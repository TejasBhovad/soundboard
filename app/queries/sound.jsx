import { Client, Databases } from "appwrite";
import { ID } from "appwrite";
import { Query } from "appwrite";


const client = new Client();
const databases = new Databases(client);
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const saveSound = async (
  sound_id,
  name,
  logo,
  file,
  plays,
  creator,
  board,
  last_played
) => {
  try {
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_SOUNDS_ID,
      ID.unique(),
      {
        sound_id,
        name,
        logo,
        file,
        plays,
        creator,
        board,
        //   creator: data.documents[0].$id,
        //   board: data.documents[0].boards.$id,
        last_played,
      }
    );
    console.log("Sound saved successfully");
  } catch (error) {
    console.log(error);
  }
};

const getSoundById = async (sound_id) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_SOUNDS_ID,
      [Query.equal("sound_id", sound_id)]
    );
    return response.documents[0];
  } catch (error) {
    console.log(error);
  }
};

const getSoundsByBoard = async (board) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_SOUNDS_ID,
      [Query.equal("board", board)]
    );
    return response.documents;
  } catch (error) {
    console.log(error);
  }
};

const getSoundsByCreator = async (creator) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_SOUNDS_ID,
      [Query.equal("creator", creator)]
    );
    return response.documents;
  } catch (error) {
    console.log(error);
  }
};

const getSoundsByBoardAndCreator = async (board, creator) => {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_SOUNDS_ID,
      [Query.equal("board", board), Query.equal("creator", creator)]
    );
    return response.documents;
  } catch (error) {
    console.log(error);
  }
};

const updateSound = async (
  sound_id,
  name,
  logo,
  file,
  plays,
  creator,
  board,
  last_played
) => {
  try {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_SOUNDS_ID,
      sound_id,
      {
        sound_id,
        name,
        logo,
        file,
        plays,
        creator,
        board,
        last_played,
      }
    );
    console.log("Sound updated successfully");
  } catch (error) {
    console.log(error);
  }
};

const deleteSound = async (sound_id) => {
  try {
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DB_ID,
      process.env.NEXT_PUBLIC_APPWRITE_SOUNDS_ID,
      sound_id
    );
    console.log("Sound deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

export {
  saveSound,
  updateSound,
  deleteSound,
  getSoundById,
  getSoundsByBoard,
  getSoundsByCreator,
  getSoundsByBoardAndCreator,
};
