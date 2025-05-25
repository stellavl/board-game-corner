import { findAllCafes, findCafesByCity, findCafeById } from "../repositories/cafe-repo.js";

export const getAllCafes = async () => {
  return await findAllCafes();
};

export const getCafesByCity = async (city) => {
  return await findCafesByCity(city);
};

export const getCafeById = async (id) => {
  return await findCafeById(id);
};