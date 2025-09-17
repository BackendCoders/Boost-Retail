/** @format */

import { categoriesEndpoint } from '../api';
import {
	handleDeleteReq,
	handleGetReq,
	handlePostReq,
	handlePutReq,
} from '../apiRequestHandler';

const {
	CREATE_CATEGORY,
	GET_CATEGORIES,
	GET_CATEGORY_PARENTS,
	UPDATE_CATEGORY,
	DELETE_CATEGORY,
	GET_CATEGORY_LOOKUP,
	ADD_CATEGORY_LOOKUP_ASYNC,
	UPDATE_CATEGORY_LOOKUP_ASYNC,
	DELETE_CATEGORY_LOOKUP_ASYNC,
	GET_CATEGORY_MAPS,
	DELETE_CATEGORY_MAPS,
	GET_SUPPLIER_COLUMNS,
} = categoriesEndpoint;

export async function createCategory(data) {
	// Fetch current user details using token
	const response = await handlePostReq(CREATE_CATEGORY, data);
	console.log('Create Category API RESPONSE.........', response);
	return response;
}

export async function getCategories() {
	const response = await handleGetReq(GET_CATEGORIES);
	console.log('Get List Categories API RESPONSE.........', response);
	return response.data;
}

export async function getCategoryParents(id) {
	const response = await handleGetReq(GET_CATEGORY_PARENTS(id));
	console.log('Get List Category Parents API RESPONSE.........', response);
	return response.data;
}

export async function updateCategory(id, data) {
	const response = await handlePutReq(UPDATE_CATEGORY(id), data);
	console.log('Update Category API RESPONSE.........', response);
	return response;
}

export async function deleteCategory(id) {
	const response = await handleDeleteReq(DELETE_CATEGORY(id));
	console.log('Delete Category API RESPONSE.........', response);
	return response;
}

export async function getCategoryLookups() {
	const response = await handleGetReq(GET_CATEGORY_LOOKUP);
	console.log('Get List of Category Lookups API RESPONSE.........', response);
	return response.data;
}

export async function addCategoryLookupAsync(data) {
	const response = await handlePostReq(ADD_CATEGORY_LOOKUP_ASYNC, data);
	console.log('Add Category Lookup Async API RESPONSE.........', response);
	return response;
}

export async function updateCategoryLookupAsync(id, data) {
	const response = await handlePutReq(UPDATE_CATEGORY_LOOKUP_ASYNC(id), data);
	console.log('Update Category Lookup Async API RESPONSE.........', response);
	return response;
}

export async function deleteCategoryLookupAsync(id, data) {
	const response = await handleDeleteReq(
		DELETE_CATEGORY_LOOKUP_ASYNC(id),
		data
	);
	console.log('Delete Category Lookup Async API RESPONSE.........', response);
	return response;
}

export async function getCategoryMaps(id) {
	const response = await handleGetReq(GET_CATEGORY_MAPS(id));
	console.log('Get category map API RESPONSE.........', response);
	return response.data;
}
export async function deleteCategoryMaps(id) {
	const response = await handleDeleteReq(DELETE_CATEGORY_MAPS(id));
	console.log('DELETE category map API RESPONSE.........', response);
	return response;
}

export async function getSupplierColumns(id) {
	// Fetch current user details using token
	const response = await handleGetReq(GET_SUPPLIER_COLUMNS(id));
	console.log('Get List of Supplier Columns API RESPONSE.........', response);
	return response.data;
}
