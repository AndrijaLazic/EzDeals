import React from 'react';
import PostsList from '../components/ListOfProducts/ProductsList';
import { SortType } from '../dataModels/product';

const NewestProducts = () => {
	return (
		<PostsList page={1} sort={SortType.ByDateNewerFirst}/>
	);
};

export default NewestProducts;
