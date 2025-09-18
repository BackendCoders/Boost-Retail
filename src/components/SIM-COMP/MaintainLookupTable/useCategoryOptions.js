/** @format */

import { useEffect, useState } from 'react';
import { getCategoriesByParentId } from '../../../services/operations/categoryApi';

export function useCategoryOptions() {
	const [selectedCategories, setSelectedCategories] = useState({
		category1: null,
		category2: null,
		category3: null,
	});

	const [categoryOptions, setCategoryOptions] = useState({
		category1: [],
		category2: [],
		category3: [],
	});

	useEffect(() => {
		async function fetchCategory1() {
			try {
				const data = await getCategoriesByParentId(null);
				setCategoryOptions((prev) => ({
					...prev,
					category1: data?.map((item) => ({ label: item.name, value: item.id })),
				}));
			} catch (err) {
				console.error('Error fetching Category1', err);
			}
		}
		fetchCategory1();
	}, []);

	useEffect(() => {
		if (!selectedCategories.category1) return;

		async function fetchCategory2() {
			try {
				const data = await getCategoriesByParentId(
					selectedCategories.category1
				);
				setCategoryOptions((prev) => ({
					...prev,
					category2: data?.map((item) => ({ label: item.name, value: item.id })),
				}));
				setCategoryOptions((prev) => ({ ...prev, category3: [] })); // reset Category3
				setSelectedCategories((prev) => ({
					...prev,
					category2: null,
					category3: null,
				}));
			} catch (err) {
				console.error('Error fetching Category2', err);
			}
		}

		fetchCategory2();
	}, [selectedCategories.category1]);

	useEffect(() => {
		if (!selectedCategories.category2) return;

		async function fetchCategory3() {
			try {
				const data = await getCategoriesByParentId(
					selectedCategories.category2
				);
				setCategoryOptions((prev) => ({
					...prev,
					category3: data?.map((item) => ({ label: item.name, value: item.id })),
				}));
				setSelectedCategories((prev) => ({ ...prev, category3: null }));
			} catch (err) {
				console.error('Error fetching Category3', err);
			}
		}

		fetchCategory3();
	}, [selectedCategories.category2]);

	return { selectedCategories, setSelectedCategories, categoryOptions };
}
