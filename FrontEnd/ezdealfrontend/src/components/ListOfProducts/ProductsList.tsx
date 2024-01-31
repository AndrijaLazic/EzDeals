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

			setProducts(response.products as IShortProduct[]);

		};

		getProducts();
	}, []);

	const allRows=[];
	let row=[];
	for (let index = 0; index < products.length; index++) {
		row.push(<ShortProduct key={products[index]._id} product={products[index]}/>);
		if(index%4==0 && index !=0){
			allRows.push(
				<div className="row g-2">
					{row[0]}
					{row[1]}
					{row[2]}
					{row[3]}
				</div>
			);
			row=[];
		}
	}
	allRows.push(
		<div className="row g-2">
			{row[0]}
			{row[1]}
			{row[2]}
			{row[3]}
		</div>
	);

	return (
		allRows
	);

}

export default PostsList;
