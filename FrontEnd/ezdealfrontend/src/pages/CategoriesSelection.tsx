import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/categoryCard/CategoryCard';
import { ICategory } from '../dataModels/category';

const CategoriesSelection = () => {
	// ./src/assets/pictures/EzDealLogo.png

	const categories:ICategory[]=[
		{
			name:"Monitori",
			imagePath:"./src/assets/pictures/CategoryMonitori.png",
			url:"/kategorije/Monitori"
		},
		{
			name:"RacunarskeKomponente",
			imagePath:"./src/assets/pictures/CategoryRacunarskeKomponente.png",
			url:"/kategorije/RacunarskeKomponente"
		},
	];

	const categoriesArray=[];
	for (let index = 0; index < categories.length; index++){
		categoriesArray.push(
			<CategoryCard key={categories[index].name} category={categories[index]}/>
		);
	}

	return (
		<div className="row justify-content-center g-2">
			{categoriesArray}
		</div>
	);
};

export default CategoriesSelection;
