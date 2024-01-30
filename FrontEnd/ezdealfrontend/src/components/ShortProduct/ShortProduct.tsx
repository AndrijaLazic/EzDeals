import React from 'react';
import "./ShortProduct.css";
import { IShortProduct } from '../../dataModels/product';

const ShortProduct = (props:any) => {
	const product:IShortProduct=props.product as IShortProduct;
	return (
		<div className='shortItem'>
			<div className="row">
				<div className="col-sm">
					<img src={product.image}/>
				</div>
			</div>	
			<div className="row">
				<div className="col-sm">
					<p>{product.currentBestPrice} din.</p>
				</div>
			</div>	
			<div className="row">
				<div className="col-sm">
					<p>{product.name}</p>
				</div>
			</div>	
		</div>
	);
};

export default ShortProduct;
