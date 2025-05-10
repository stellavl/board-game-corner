import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import {
  findBoardGameByBggId,
  insertBoardGame,
  getHotBoardGames,
  markGameAsHot,
  markGameAsNotHot,
  getBoardGameByName
} from "../repositories/board-game-repo.js";

export const fetchHotBoardGamesFromBGG = async () => {
    const response = await axios.get('https://boardgamegeek.com/xmlapi2/hot?type=boardgame');
    const parsedData = await parseStringPromise(response.data);
    return parsedData.items.item.map(item => item.$.id);
};

export const fetchBoardGameDetailsByIdFromBGG = async (gameId) => {
    const response = await axios.get(`https://boardgamegeek.com/xmlapi/boardgame/${gameId}`);
    const parsedData = await parseStringPromise(response.data);
    const game = parsedData.boardgames.boardgame[0];
    return {
        bgg_id: game.$.objectid,
        name: game.name[0]._,
        category: game.boardgamecategory[0]._, 
        min_players: parseInt(game.minplayers[0], 10),
        max_players: parseInt(game.maxplayers[0], 10),
        playing_time: parseInt(game.playingtime[0], 10),
        age: parseInt(game.age[0], 10),
        description: game.description[0],
        image: game.image ? game.image[0] : null,
        is_hot: true,
    };
};

export const getBoardGameByNameService = async (name) => {
    try {
        const gameDetails = await getBoardGameByName(name);
        return gameDetails;
    } catch (error) {
        throw error;
    }
}

export const updateHotGamesService = async () => {
  try {
    const hotGameIds = await fetchHotBoardGamesFromBGG();

    // Mark existing games as hot or insert them if they don't exist
    for (const gameId of hotGameIds) {
        const gameDetails = await fetchBoardGameDetailsByIdFromBGG(gameId);

        const existingGameInLocalDB = await findBoardGameByBggId(gameDetails.bgg_id);

        if (existingGameInLocalDB.length > 0) {
            await markGameAsHot(gameId);
        } else {
            await insertBoardGame(gameDetails);
        }
    }

    // Mark games as not hot if they are no longer in the hotGameIds list
    const currentlyHotGames = await getHotBoardGames();
    for (const game of currentlyHotGames) {
        if (!hotGameIds.includes(game.bgg_id)) {
            await markGameAsNotHot(game.bgg_id);
        }
    }
  } catch (error) {
    throw new Error('Σφάλμα κατά την ανάκτηση και αποθήκευση των δημοφιλών παιχνιδιών από το BGG');
  }
};

export const getHotBoardGamesService = async () => {
    try {
        const hotBoardGames = await getHotBoardGames();
        return hotBoardGames;
    } catch (error) {
        throw new Error('Σφάλμα κατά την ανάκτηση των δημοφιλών παιχνιδιών.');
    }
};
