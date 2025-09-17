/** @format */

const BASE = import.meta.env.VITE_BASE_URL;

export const categoriesEndpoint = {
	CREATE_CATEGORY: `${BASE}/api/Category`,
	GET_CATEGORIES: `${BASE}/api/Category/GetAllCategories`,
	GET_CATEGORY_PARENTS: (id) =>
		`${BASE}/api/Category/GetCategoryParents?categoryId=${id}`,
	UPDATE_CATEGORY: (id) => `${BASE}/api/Category/${id}`,
	DELETE_CATEGORY: (id) => `${BASE}/api/Category/${id}`,

	GET_CATEGORY_LOOKUP: `${BASE}/api/Category/GetCategoryLookups`,
	ADD_CATEGORY_LOOKUP_ASYNC: `${BASE}/api/Category/AddCategoryLookupAsync`,
	UPDATE_CATEGORY_LOOKUP_ASYNC: (id) =>
		`${BASE}/api/Category/UpdateCategoryLookupAsync/${id}`,
	DELETE_CATEGORY_LOOKUP_ASYNC: (id) =>
		`${BASE}/api/Category/DeleteCategoryLookupAsync/${id}`,
	GET_CATEGORY_MAPS: (id) =>
		`${BASE}/api/Category/GetCategoryMaps?lookupId=${id}`,
	DELETE_CATEGORY_MAPS: (id) =>
		`${BASE}/api/Category/DeleteCategoryMapAsync/${id}`,
	GET_SUPPLIER_COLUMNS: (id) =>
		`${BASE}/api/Category/GetSupplierColumns?supplier=${id}`,
	GET_CATEGORIES_BY_PARENT_ID: (id) =>
		`${BASE}/api/Category/GetCategoryByParentId${id ? `?parentId=${id}` : ''}`,
};
