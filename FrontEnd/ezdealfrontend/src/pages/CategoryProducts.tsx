import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SortType } from '../dataModels/product';
import ProductsList from '../components/ListOfProducts/ProductsList';
import Pagination from '../components/Pagination/Pagination';
import { AppConfig } from '../appConfig';
import { ICategory } from '../dataModels/category';
import NoProductsFound from '../components/errors/NoProductsFound';

const CategoryProducts = () => {

	const {category}=useParams();

	const categoryInfo:ICategory=AppConfig.getCategory(category!);
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams();

	const pageParam=+(searchParams.get('page') || 1);

	const[maxPages,setMaxPages]=useState(1);
	const[currentPage,setCurrentPage]=useState(pageParam);
	
	if(currentPage!=pageParam){
		setCurrentPage(pageParam);
	}
	
	return (
		<div className='container'>
			<div className="row g-2"><h2>{categoryInfo.name}</h2></div>
			

			{maxPages!=0 ? 
				<>
					<ProductsList page={currentPage} sort={SortType.ByPriceAcending} category={category} setMaxPages={setMaxPages}/>
					<Pagination maxPages={maxPages} baseUrl={"/kategorije/"+category+"?page="} currentPage={currentPage}/>
				</>:
				<div className="row g-2 justify-content-center">
					<NoProductsFound message="Nije pronadjen nijedan proizvod :("/>
				</div>
			}
		</div>
	);
};

export default CategoryProducts;
