import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import {
  findBoardGameByBggId,
  insertBoardGame,
  getHotBoardGames,
  markGameAsHot,
  markGameAsNotHot,
  getBoardGameByName,
  getHotBoardGameCategories,
  getFilteredHotBoardGamesRepo,
  getCafesWithBoardGame
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
        // Check if board games exists in local DB
        const gameDetails = await getBoardGameByName(name);
        if (gameDetails) {
            const cafesWithBoardGame = await getCafesWithBoardGame(name);
            return { ...gameDetails, cafesWithBoardGame };
        }

        // Not found locally, search BGG
        const bggResults = await searchBoardGamesByNameFromBGG(name);
        if (!bggResults.length) {
            throw new Error('Το παιχνίδι δεν βρέθηκε.');
        }

        // Fetch details for each BGG result and filter by exact name
        for (const result of bggResults) {
            const details = await fetchBoardGameDetailsByIdFromBGG(result.bgg_id, false);
            if (details.name && details.name.trim().toLowerCase() === name.trim().toLowerCase()) {
                // Cache board game details in local DB
                saveBoardGameToDbService(details);
                const gameDetails = await getBoardGameByName(name);
                // Not in local DB, so cafeCount is 0
                return { ...gameDetails, cafesWithBoardGame: [] };
            }
        }
        
        throw new Error('Το παιχνίδι δεν βρέθηκε.');
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

export const getHotBoardGamesService = async (currentPage = 1, pageSize = 8) => {
    try {
        const hotBoardGames = await getHotBoardGames();
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedGames = hotBoardGames.slice(startIndex, endIndex);
        return { 
            boardGames: paginatedGames,
            totalElements: hotBoardGames.length 
        };
    } catch (error) {
        throw new Error('Σφάλμα κατά την ανάκτηση των δημοφιλών παιχνιδιών.');
    }
};

export const searchBoardGamesByNameFromBGG = async (searchText) => {
    try {
        const response = await axios.get(`https://www.boardgamegeek.com/xmlapi/search?search=${searchText}`);
        const parsedData = await parseStringPromise(response.data);
        if (!parsedData.boardgames || !parsedData.boardgames.boardgame) {
            return [];
        }
        const gameData = parsedData.boardgames.boardgame.map(game => ({
            bgg_id: game.$.objectid,
            name: game.name[0]._,
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

export const saveBoardGameToDbService = async (gameDetails) => {
    try {
        // Map and set defaults
        const mappedGame = {
            bgg_id: gameDetails.bgg_id,
            name: gameDetails.name,
            category: gameDetails.category || '',
            min_players: gameDetails.min_players || 0,
            max_players: gameDetails.max_players || 0,
            playing_time: gameDetails.playing_time || 0,
            age: gameDetails.age || 0,
            description: gameDetails.description || '',
            image: gameDetails.image || null,
            is_hot: false,
        };

        // Check existence by BGG ID
        const existingById = await findBoardGameByBggId(mappedGame.bgg_id);
        if (existingById.length > 0) {
            return existingById[0].id;
        }

        // Check existence by name
        const existingByName = await getBoardGameByName(mappedGame.name);
        if (existingByName) {
            return existingByName.id;
        }

        // Insert if not exists
        return await insertBoardGame(mappedGame);
    } catch (error) {
        throw new Error('Σφάλμα κατά την αποθήκευση του παιχνιδιού στη βάση δεδομένων.');
    }
};

const fetchDistinctCategoriesFromBGG = async (searchText) => {
    const response = await axios.get(`https://www.boardgamegeek.com/xmlapi/search?search=${searchText}`);
    const parsedData = await parseStringPromise(response.data);
    if (!parsedData.boardgames || !parsedData.boardgames.boardgame) {
        return [];
    }
    const boardgames = parsedData.boardgames.boardgame;
    const categoriesSet = new Set();
    for (const game of boardgames) {
        const bggId = game.$.objectid;
        try {
            const details = await fetchBoardGameDetailsByIdFromBGG(bggId, false);
            if (details.category) {
                categoriesSet.add(details.category.trim());
            }
        } catch (error) {
            // Ignore errors for individual games
            continue;
        }
    }
    return Array.from(categoriesSet);
};


export const getBoardGamesCategoriesService = async (searchText) => {
    if (searchText) {
        try {
            const categories = await fetchDistinctCategoriesFromBGG(searchText);
            return categories;
        } catch (error) {
            throw new Error(error.message);
        }
    } else {
        try {
            const categories = await getHotBoardGameCategories();
            return categories;
        } catch (error) {
            throw new Error('Σφάλμα κατά την ανάκτηση των κατηγοριών.');
        }
    }
};

export const filterBoardGamesBySearchTermService = async (filters, searchTerm = '') => {
  try {
    const bggResults = await searchBoardGamesByNameFromBGG(searchTerm.trim());
    const filteredGames = [];
    for (const result of bggResults) {
      try {
        const details = await fetchBoardGameDetailsByIdFromBGG(result.bgg_id, false);

        // Apply filters
        let matches = true;
        if (filters.categories && filters.categories.length > 0 && filters.categories[0] !== '') {
          matches = matches && filters.categories.includes(details.category);
        }
        if (filters.minPlayers != null) {
          matches = matches && details.min_players >= filters.minPlayers;
        }
        if (filters.maxPlayers != null) {
          matches = matches && details.max_players <= filters.maxPlayers;
        }
        if (filters.minAge != null) {
          matches = matches && details.age >= filters.minAge;
        }
        if (filters.minduration != null) {
          matches = matches && details.playing_time >= filters.minduration;
        }
        if (filters.maxduration != null) {
          matches = matches && details.playing_time <= filters.maxduration;
        }

        if (matches) {
          filteredGames.push(details);
        }
      } catch (e) {
        continue;
      }
    }
    const totalElements = filteredGames.length;
    // Return all filtered games, no pagination
    return { boardGames: filteredGames, totalElements };
  } catch (error) {
    throw new Error('Σφάλμα κατά το φιλτράρισμα των επιτραπέζιων παιχνιδιών από το BGG.');
  }
};

export const filterHotBoardGamesService = async (filters) => {
  try {
    const boardGames = await getFilteredHotBoardGamesRepo(filters);
    const totalElements = boardGames.length;
    return { boardGames, totalElements };
  } catch (error) {
    throw new Error('Σφάλμα κατά το φιλτράρισμα των hot επιτραπέζιων παιχνιδιών.');
  }
};

export const filterBoardGamesService = async (filters, searchTerm = '') => {
  if (searchTerm && searchTerm.trim() !== '') {
    return await filterBoardGamesBySearchTermService(filters, searchTerm);
  } else {
    return await filterHotBoardGamesService(filters);
  }
};