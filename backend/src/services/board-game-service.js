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

export const fetchBoardGameDetailsByIdFromBGG = async (gameId, isHot) => {
    const response = await axios.get(`https://boardgamegeek.com/xmlapi/boardgame/${gameId}`);
    const parsedData = await parseStringPromise(response.data);
    const game = parsedData.boardgames.boardgame[0];
    return {
        bgg_id: game.$.objectid,
        name: game.name[0]._,
        category: game.boardgamecategory?.[0]?._ || '', 
        min_players: parseInt(game.minplayers[0], 10),
        max_players: parseInt(game.maxplayers[0], 10),
        playing_time: parseInt(game.playingtime[0], 10),
        age: parseInt(game.age[0], 10),
        description: game.description[0],
        image: game.image ? game.image[0] : null,
        is_hot: isHot || false,
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
        const gameDetails = await fetchBoardGameDetailsByIdFromBGG(gameId, true);

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

export const getBoardGameIDsByNameFromBGG = async (searchText) => {
    try {
        const response = await axios.get(`https://www.boardgamegeek.com/xmlapi/search?search=${searchText}`);
        const parsedData = await parseStringPromise(response.data);
        if (!parsedData.boardgames || !parsedData.boardgames.boardgame) {
            return [];
        }
        const gameData = parsedData.boardgames.boardgame.map(game => ({
            bgg_id: game.$.objectid,
        }));
        return gameData;
    } catch (error) {
            throw new Error(error.message);
    }
}

export const fetchPaginatedBoardGameDetails = async (boardGameIds, currentPage = 1, pageSize = 8) => {
    const totalElements = boardGameIds.length;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Get the IDs for the current page
    const paginatedIds = boardGameIds.slice(startIndex, endIndex);

    // Fetch details for each ID
    const boardGames = [];
    for (const game of paginatedIds) {
        try {
            const gameDetails = await fetchBoardGameDetailsByIdFromBGG(game.bgg_id, false);
            boardGames.push(gameDetails);
        } catch (error) {
            throw new Error("Σφάλμα κατά την ανάκτηση των παιχνιδιών που ταιριάζουν στην αναζήτηση.");
        }
    }
    return { boardGames, totalElements };
};
