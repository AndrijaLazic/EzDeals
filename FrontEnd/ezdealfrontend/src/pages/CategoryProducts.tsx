import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SortType } from '../dataModels/product';
import ProductsList from '../components/ListOfProducts/ProductsList';
import Pagination from '../components/Pagination/Pagination';
import { AppConfig } from '../appConfig';
import { ICategory } from '../dataModels/category';
import NoProductsFound from '../components/errors/NoProductsFound';
import FilterTab from '../components/filterTab/FilterTab';

const CategoryProducts = () => {

	const {category}=useParams();

	const categoryInfo:ICategory=AppConfig.getCategory(category!);
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams();

	const pageParam=+(searchParams.get('page') || 1);
	const sortParam=(searchParams.get('sort') || "");

	const[maxPages,setMaxPages]=useState(1);
	const[currentPage,setCurrentPage]=useState(pageParam);
	const[currentSortParam,setCurrentSortParam]=useState("");
	
	if(currentPage!=pageParam){
		setCurrentPage(pageParam);
	}
	if(currentSortParam!=sortParam){
		if(sortParam in SortType){
			setCurrentSortParam(sortParam);
		}
	}
	
	const navigate = useNavigate();
	function handleSetSort(value:any){
		navigate("/kategorije/"+category+"?sort="+value+"&page=1");
	}

	const baseUrl="/kategorije/"+category+"?sort="+currentSortParam+"&page=";

	return (
		<div className='container'>
			<div className="row g-2"><h2>{categoryInfo.name}</h2></div>
			{maxPages!=0 ? 
				<>
					<FilterTab setCurrentSortParam={handleSetSort}/>
					<ProductsList currentPage={currentPage} sort={currentSortParam} category={category} setMaxPages={setMaxPages}/>
					<Pagination maxPages={maxPages} baseUrl={baseUrl} currentPage={currentPage}/>
				</>:
				<div className="row g-2 justify-content-center">
					<NoProductsFound message="Nije pronadjen nijedan proizvod :("/>
				</div>
			}
		</div>
	);
};

export default CategoryProducts;
