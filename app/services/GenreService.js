import { fetchAPI } from './apiClient';

export const getAllGenres = async () => {
  return await fetchAPI('/genres');
};