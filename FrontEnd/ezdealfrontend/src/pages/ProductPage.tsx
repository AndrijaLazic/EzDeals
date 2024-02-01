import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = (props:any) => {
	const {category,productId} = useParams();
	return (
		<div>{productId}{category}</div>
	);
};

export default ProductPage;
