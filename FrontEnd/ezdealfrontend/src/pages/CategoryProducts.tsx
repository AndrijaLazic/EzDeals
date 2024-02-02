import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SortType } from '../dataModels/product';
import ProductsList from '../components/ListOfProducts/ProductsList';
import Pagination from '../components/Pagination/Pagination';

const CategoryProducts = () => {
	const {category} = useParams();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get('page');

	const[maxPages,setMaxPages]=useState(1);

	return (
		<div>
			<ProductsList page={page} sort={SortType.ByPriceAcending} category={category} setMaxPages={setMaxPages}/>
			<Pagination maxPages={maxPages} baseUrl={"/kategorije/"+category+"?page="}/>
		</div>
	);
};

export default CategoryProducts;
