import { SearchInfo, SortType } from "../dataModels/product";

const BASE_URL = `${import.meta.env.VITE_APP_BASE_ENDPOINT}/api/`;
const headers = {
	"Content-Type": "application/json",
	Accept: "application/json"
};

class ProductService {
	async getNewProducts(page:string) {

		const response = await fetch(BASE_URL+"product/newProducts/?page="+page, {
			method: "GET",
			headers: headers
		});

		const data = await response.json();
		// data is returned as a json message with a status code

		if (!response.ok) {
			let message;

			if (data?.message) {
				message = data.message; // other server messages that we dont have control of
			} else {
				message = data; // our custom messages
			}

			return { error: true, message };
		}

		return data;
	}

	async getProductsFromCategory(category:string,page:string,sort:string) {

		const response = await fetch(BASE_URL+"product/"+category+"/?sort="+sort+"&page="+page, {
			method: "GET",
			headers: headers
		});

		const data = await response.json();
		// data is returned as a json message with a status code

		if (!response.ok) {
			let message;

			if (data?.message) {
				message = data.message; // other server messages that we dont have control of
			} else {
				message = data; // our custom messages
			}

			return { error: true, message };
		}

		return data;
	}

	async getSingleProduct(productId:string,category:string) {
		const response = await fetch(BASE_URL+"product/"+category+"/"+productId, {
			method: "GET",
			headers: headers
		});

		const data = await response.json();
		// data is returned as a json message with a status code

		if (!response.ok) {
			let message;

			if (data?.message) {
				message = data.message; // other server messages that we dont have control of
			} else {
				message = data; // our custom messages
			}

			return { error: true, message };
		}

		return data;
	}

	async getProductsFromSearch(body: SearchInfo) {
		const response = await fetch(BASE_URL+"product/search?page=" + body.pageNum, {
			method: "POST",
			headers: headers,
			body:JSON.stringify(body)
		});
		
		const data = await response.json();
		// data is returned as a json message with a status code

		if (!response.ok) {
			let message;

			if (data?.message) {
				message = data.message; // other server messages that we dont have control of
			} else {
				message = data; // our custom messages
			}

			return { error: true, message };
		}

		return data;
	}

	async getProductHistory(historyId:string) {
		const response = await fetch(BASE_URL+"product/history/"+historyId, {
			method: "GET",
			headers: headers
		});

		const data = await response.json();
		// data is returned as a json message with a status code

		if (!response.ok) {
			let message;

			if (data?.message) {
				message = data.message; // other server messages that we dont have control of
			} else {
				message = data; // our custom messages
			}

			return { error: true, message };
		}

		return data;
	}
}

export const productService = new ProductService();
