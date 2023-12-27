import { Client, Databases } from "appwrite";
import { ID } from "appwrite";

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
        board,
        last_played,
      }
    );
    console.log("Sound saved successfully");
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
        board,
        last_played,
      }
    );
    console.log("Sound updated successfully");
  } catch (error) {
    console.log(error);
  }
};

const deleteSound = async (sound_id, sound_logo, soundFile) => {
  try {
    if (sound_logo.startsWith("https://utfs.io/")) {
      console.log("Deleted sound_logo");
    }
    if (soundFile.startsWith("https://utfs.io/")) {
      console.log("Deleted soundFile");
    }
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

export { saveSound, updateSound, deleteSound };
