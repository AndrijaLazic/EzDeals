import { SearchInfo } from "../dataModels/product";

const BASE_URL = `${import.meta.env.VITE_APP_BASE_ENDPOINT}/api/`;
const headers = {
	"Content-Type": "application/json",
	Accept: "application/json"
};

class ProductService {
	async getNewProducts() {

		const response = await fetch(BASE_URL+"product/newProducts", {
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

	async getProductsFromCategory(category:string,page:string) {

		const response = await fetch(BASE_URL+"product/"+category+"/?page="+page, {
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

	async getSingleProduct(productId:string) {
		const response = await fetch(BASE_URL+"product/newProducts", {
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

	// async getProductsFromCategory(category: string, page: string) {
	// 	const response = await axios.get(
	// 		"product/" + category + "/?page=" + page
	// 	);
	// 	return response;
	// }
}

export const productService = new ProductService();
