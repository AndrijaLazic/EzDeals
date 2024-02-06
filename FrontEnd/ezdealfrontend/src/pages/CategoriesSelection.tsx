import React from 'react';
import CategoryCard from '../components/categoryCard/CategoryCard';
import { ICategory } from '../dataModels/category';
import { AppConfig } from '../AppConfig';



const CategoriesSelection = () => {


	const categories:ICategory[]=AppConfig.getCategories();

	const categoriesArray=[];
	for (let index = 0; index < categories.length; index++){
		categoriesArray.push(
			<CategoryCard key={categories[index].name} category={categories[index]}/>
		);
	}

	return (
		<div>
			<h4>Izabrane kategorije</h4>
			<div className="row justify-content-center g-2">
				{categoriesArray}
			</div>
		</div>
	);
};

export default CategoriesSelection;
