/** @format */

const BASE = import.meta.env.VITE_BASE_URL;

console.log(BASE);

export const categoriesEndpoint = {
	GET_CATEGORIES: `${BASE}/api/Category/GetAllCategories`,
};
