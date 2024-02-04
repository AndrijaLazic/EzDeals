import React from 'react';
import ProductsList from '../components/ListOfProducts/ProductsList';
import { SortType } from '../dataModels/product';

const NewestProducts = () => {
	return (
		<div className='container'>
			<div className="row g-2"><h2>Najnoviji proizvodi</h2></div>
			<ProductsList page={1} sort={SortType.ByDateNewerFirst} category="newProducts"/>
		</div>
	);
};

export default NewestProducts;
