import React from 'react';
import PostsList from '../components/ListOfProducts/ProductsList';
import { SortType } from '../dataModels/product';

const NewestProducts = () => {
	return (
		<div className='container'>
			<PostsList page={1} sort={SortType.ByDateNewerFirst}/>
		</div>
	);
};

export default NewestProducts;
