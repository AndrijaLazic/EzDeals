import { useState } from 'react';
import ProductsList from '../../components/ListOfProducts/ProductsList';
import { SortType } from '../../dataModels/product';
import Pagination from '../../components/Pagination/Pagination';
import NoProductsFound from '../../components/errors/NoProductsFound';
import { useSearchParams } from 'react-router-dom';
import Carousel from '../../components/carousel/Carousel';
import "./NewestProducts.css";
const NewestProducts = () => {
	const[maxPages,setMaxPages]=useState(1);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams();
	const pageParam = +(searchParams.get('page') || 1);

	const[currentPage,setCurrentPage]=useState(pageParam);
	
	if(currentPage!=pageParam){
		setCurrentPage(pageParam);
	}

	return (
		<div>
			<Carousel/>
			<div className="row mt-3"><h2 id='pageHeading'>Najnoviji proizvodi</h2></div>
			
			{maxPages!=0 ? 
				<>
					<ProductsList currentPage={currentPage} sort={SortType.ByDateNewerFirst} category="newProducts" setMaxPages={setMaxPages}/>
					<Pagination maxPages={maxPages} baseUrl={"/noviProizvodi?page="} currentPage={currentPage}/>
				</>:
				<div className="row g-2 justify-content-center">
					<NoProductsFound message="Nije pronadjen nijedan proizvod :("/>
				</div>
			}
		</div>
	);
};

export default NewestProducts;
