import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct, IShortProduct } from '../dataModels/product';
import { productService } from '../services/product.service';
import ShopCard from '../components/shopCard/ShopCard';

const ProductPage = (props: any) => {
	const { category, productId } = useParams();
	const [product, setProduct] = useState<IProduct>();

	useEffect(() => {
		const getProducts = async () => {

			const response = await productService.getSingleProduct(productId!, category!);

			if (response.error) {
				return console.log(response.error);
			}

			setProduct(response.product as IProduct);

		};

		getProducts();
	}, []);

	if (!product) {
		return (
			<div className='container px-4 px-lg-5 my-5'>
				<h4>Dati proizvod ne postoji</h4>
			</div>
		);
	}


	return (
		<div className='container px-4 px-lg-5 my-5'>
			{renderProduct(product)}
		</div>
	);
};

function renderProduct(product: IProduct) {

	const shopCards=[];
	for (let index = 0; index < product.prices.length; index++) {
		shopCards.push(
			<ShopCard price={product.prices[index]} key={index}/>
		);
	}


	return (
		<div className="row gx-4 gx-lg-5 align-items-center">
			<div className="col-md-6">
				<img className="card-img-top mb-5 mb-md-0" src={product.image} alt="..."/>
				<h2 className="display-5 fw-bolder">{product.name}</h2>
			</div>
			<div className="col-md-6">
				{shopCards}
			</div>
		</div>
	);
}

export default ProductPage;
