/** @format */

import { categoriesEndpoint } from '../api';
import {
	handleDeleteReq,
	handleGetReq,
	handlePostReq,
	handlePutReq,
} from '../apiRequestHandler';

const { CREATE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY, DELETE_CATEGORY } =
	categoriesEndpoint;

export async function createCategory(data) {
	// Fetch current user details using token
	const response = await handlePostReq(CREATE_CATEGORY, data);
	console.log('Create Category API RESPONSE.........', response);
	return response.data;
}

export async function getCategories() {
	// Fetch current user details using token
	const response = await handleGetReq(GET_CATEGORIES);
	console.log('Get List Categories API RESPONSE.........', response);
	return response.data;
}

export async function updateCategory(data) {
	const id = data.id;
	const response = await handlePutReq(UPDATE_CATEGORY(id), data);
	console.log('Update Category API RESPONSE.........', response);
	return response.data;
}

export async function deleteCategory(id) {
	const response = await handleDeleteReq(DELETE_CATEGORY(id));
	console.log('Delete Category API RESPONSE.........', response);
	return response.data;
}
