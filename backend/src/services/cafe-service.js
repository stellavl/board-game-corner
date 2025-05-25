import { findAllCafes, findCafesByCity, findCafeById, findPaginatedBoardGamesByCafeId } from "../repositories/cafe-repo.js";

export const getAllCafes = async () => {
  return await findAllCafes();
};

export const getCafesByCity = async (city) => {
  return await findCafesByCity(city);
};

export const getCafeById = async (id) => {
  return await findCafeById(id);
};

export const getPaginatedBoardGamesByCafeId = async (cafeId, pageSize = 8, currentPage = 1) => {
  const limit = pageSize;
  const offset = (currentPage - 1) * pageSize;
  const { rows, totalElements } = await findPaginatedBoardGamesByCafeId(cafeId, limit, offset);
  return { boardGames: rows, totalElements };
};