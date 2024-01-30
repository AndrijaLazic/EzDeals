import { IShortProduct } from "../../dataModels/product";
import { productService } from "../../services/product.service";
import ShortProduct from "../ShortProduct/ShortProduct";
import "./ProductsList.css";

import React, { useEffect, useState } from 'react';

function PostsList(props: any) {
	const [products, setProducts] = useState<IShortProduct[]>([]);

	useEffect(() => {
		const getProducts = async() => {

			const response = await productService.getNewProducts();

			if (response.error) {
				return console.log(response.error);
			}

			console.log(response)

			setProducts(response as IShortProduct[]);

		};

		getProducts();
	}, []);

	return (
		<ul>
			{
				products.map((product)=>{
					return <ShortProduct product={product}/>;
				})
			}
		</ul>
	);

}

export default PostsList;
