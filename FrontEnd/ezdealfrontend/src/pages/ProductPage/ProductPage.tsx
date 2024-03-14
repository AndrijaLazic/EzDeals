import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../../dataModels/product';
import { productService } from '../../services/product.service';
import ShopCard from '../../components/shopCard/ShopCard';
import NoProductsFound from '../../components/errors/NoProductsFound';
import ProductHistoryGraph from '../../components/productHistoryGraph/ProductHistoryGraph';
import "./ProductPage.css";

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
		<div className='container mt-2'> 
			{renderProduct(product)}
			<ProductHistoryGraph product={product}/>
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
		<>
			<div className="row pb-3 align-items-start justify-content-between">
				<div className="col-md-4">
					<img className="card-img-top mb-3 mb-md-0 px-3" src={product.image} alt="..."/>
					<h2 className="display-5 fw-bolder" id='productNAME'>{product.name}</h2>
				</div>
				<div className="col-md-6" id='listOfShops'>
					<h3 id='shopCardsTITLE'>Cene u prodavnicama</h3>
					{shopCards}
				</div>
			</div>
		</>
	);
}

export default ProductPage;
