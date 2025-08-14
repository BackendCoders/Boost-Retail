/** @format */

const BASE = import.meta.env.VITE_BASE_URL;

export const categoriesEndpoint = {
	CREATE_CATEGORY: `${BASE}/api/Category`,
	GET_CATEGORIES: `${BASE}/api/Category/GetAllCategories`,
	UPDATE_CATEGORY: (id) => `${BASE}/api/Category/${id}`,
	DELETE_CATEGORY: (id) => `${BASE}/api/Category/${id}`,
};
