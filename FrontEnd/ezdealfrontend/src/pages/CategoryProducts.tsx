import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SortType } from '../dataModels/product';
import ProductsList from '../components/ListOfProducts/ProductsList';
import Pagination from '../components/Pagination/Pagination';
import { AppConfig } from '../AppConfig';
import { ICategory } from '../dataModels/category';

const CategoryProducts = () => {

	const {category}=useParams();

	const categoryInfo:ICategory=AppConfig.getCategory(category!);
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get('page');

	const[maxPages,setMaxPages]=useState(1);

	return (
		<div className='container'>
			<div className="row g-2"><h2>{categoryInfo.name}</h2></div>
			<ProductsList page={page} sort={SortType.ByPriceAcending} category={category} setMaxPages={setMaxPages}/>
			<Pagination maxPages={maxPages} baseUrl={"/kategorije/"+category+"?page="}/>
		</div>
	);
};

export default CategoryProducts;
