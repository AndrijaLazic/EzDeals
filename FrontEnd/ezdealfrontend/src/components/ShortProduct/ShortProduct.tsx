import React from 'react';
import "./ShortProduct.css";
import { IShortProduct } from '../../dataModels/product';

const ShortProduct = (props:any) => {
	const product:IShortProduct=props.product as IShortProduct;
	return (
		<div className='col-md-3 pt-2 '>
			<div className='shortItem'>
				<div className="col-sm productImage">
					<img className='card-img-top' src={product.image}/>
				</div>
		
				<div className='productData'>
					<div className="productName"><h5>{product.name}</h5></div>

					<div className='productPrice'>{product.currentBestPrice} din.</div>
					
				</div>
			</div>
			
		</div>
	);
};

export default ShortProduct;
