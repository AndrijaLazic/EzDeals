import { IShortProduct } from "../../dataModels/product";
import { productService } from "../../services/product.service";
import ShortProduct from "../ShortProduct/ShortProduct";
import "./ProductsList.css";

import { useEffect, useState } from 'react';

function ProductsList(props: any) {
	const [products, setProducts] = useState<IShortProduct[]>([]);

	if(props.products){
		return (
			productsToHtml(props.products as IShortProduct[])
		);
	}


	
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
				props.setMaxPages(
					0
				);
				return console.log(response);
			}

			setProducts(response.products as IShortProduct[]);

			props.setMaxPages(
				response.maxPages
			);
		};

		getProducts();
	}, []);

	
	

	return (
		productsToHtml(products)
	);

}

function productsToHtml(products:IShortProduct[]){
	const allRows=[];
	let row=[];
	let numbOfProdInRow=0;
	const productsLength=products.length;
	for (let index = 0; index <productsLength; index++) {
		row.push(<ShortProduct key={products[index]._id} product={products[index]}/>);
		numbOfProdInRow++;
		if(numbOfProdInRow==6){
			numbOfProdInRow=0;
			allRows.push(
				<div className="row g-2" key={allRows.length}>
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
		<div className="row g-2" key={allRows.length}>
			{row[0]}
			{row[1]}
			{row[2]}
			{row[3]}
			{row[4]}
			{row[5]}
		</div>
	);

	return allRows;
}

export default ProductsList;
