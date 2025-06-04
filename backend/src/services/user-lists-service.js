import {
  findUserBoardGameListEntry,
  updateUserBoardGameListBoolean,
  insertUserBoardGameListEntry,
  getSpecificBoardGameListForUser,
} from "../repositories/user-lists-repo.js";

export const addBoardGameInUserListService = async (userId, boardGameId, listType, value) => {
  // Only allow valid boolean fields
  const allowedListTypes = ["is_favorite", "is_have_played", "is_want_to_play"];
  if (!allowedListTypes.includes(listType)) {
    throw new Error("Υπήρξε σφάλμα κατά την ενημέρωση της λίστας παιχνιδιών. Το πεδίο δεν είναι έγκυρο.");
  }

  // If entry exists, update the boolean field; otherwise, insert a new entry
  const entry = await findUserBoardGameListEntry(userId, boardGameId);
  if (entry) {
    await updateUserBoardGameListBoolean(entry.id, listType, value);
  } else {
    await insertUserBoardGameListEntry(userId, boardGameId, listType, value);
  }
};

export const getSpecificBoardGameListForUserService = async (userId, boardGameId) => {
  const entry = await getSpecificBoardGameListForUser(userId, boardGameId);
  return entry;
};