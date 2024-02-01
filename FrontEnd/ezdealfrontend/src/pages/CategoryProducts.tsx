import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SortType } from '../dataModels/product';
import ProductsList from '../components/ListOfProducts/ProductsList';

const CategoryProducts = () => {
	const {category} = useParams();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get('page');
	return (
		<div>
			<ProductsList page={page} sort={SortType.ByPriceAcending} category={category}/>
		</div>
	);
};

export default CategoryProducts;
