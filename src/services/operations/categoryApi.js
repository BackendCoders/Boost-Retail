/** @format */

import { categoriesEndpoint } from '../api';
import { handleGetReq } from '../apiRequestHandler';

const { GET_CATEGORIES } = categoriesEndpoint;

export async function getCategories() {
	// Fetch current user details using token
	const response = await handleGetReq(GET_CATEGORIES);
	console.log('Get List Categories API RESPONSE.........', response);
	return response.data;
}
