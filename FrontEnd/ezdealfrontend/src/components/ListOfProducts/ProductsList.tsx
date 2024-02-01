import { IShortProduct } from "../../dataModels/product";
import { productService } from "../../services/product.service";
import ShortProduct from "../ShortProduct/ShortProduct";
import "./ProductsList.css";

import { useEffect, useState } from 'react';

function ProductsList(props: any) {
	const [products, setProducts] = useState<IShortProduct[]>([]);

	useEffect(() => {
		const getProducts = async() => {

			let response;
			
			switch (props.category) {
				case "newProducts":
					response = await productService.getNewProducts();
					break;
				default:
					response = await productService.getProductsFromCategory(props.category,props.page);
					break;
			}

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
		if(index%6==0 && index !=0){
			allRows.push(
				<div className="row g-2">
					{row[0]}
					{row[1]}
					{row[2]}
					{row[3]}
					{row[4]}
					{row[5]}
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
			{row[4]}
			{row[5]}
		</div>
	);

	return (
		allRows
	);

}

export default ProductsList;
