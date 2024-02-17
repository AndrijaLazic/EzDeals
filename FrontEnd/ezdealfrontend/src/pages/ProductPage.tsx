import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../dataModels/product';
import { productService } from '../services/product.service';
import ShopCard from '../components/shopCard/ShopCard';
import NoProductsFound from '../components/errors/NoProductsFound';

const ProductPage = () => {
	const { category, productId } = useParams();
	const [product, setProduct] = useState<IProduct>();
	const [errorStatus, seterrorStatus] = useState(false);

	useEffect(() => {
		const getProducts = async() => {

			const response = await productService.getSingleProduct(productId!, category!);

			if (response.error) {
				console.log(response);
				seterrorStatus(true);
				return;
			}

			setProduct(response.product as IProduct);

		};

		getProducts();
	}, []);

	if(errorStatus){
		return(
			<div className="row g-2 justify-content-center">
				<NoProductsFound message="Dati proizvod ne postoji :("/>
			</div>
		);
	}

	if (!product) {
		return(
			<div className="row g-2 justify-content-center">
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
