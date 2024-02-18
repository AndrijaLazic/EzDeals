import { useState } from 'react';
import ProductsList from '../components/ListOfProducts/ProductsList';
import { SortType } from '../dataModels/product';
import Pagination from '../components/Pagination/Pagination';
import NoProductsFound from '../components/errors/NoProductsFound';
import { useSearchParams } from 'react-router-dom';

const NewestProducts = () => {
	const[maxPages,setMaxPages]=useState(1);

	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get('page') || 1;

	return (
		<div className='container'>
			<div className="row g-2"><h2>Najnoviji proizvodi</h2></div>
			
			{maxPages!=0 ? 
				<>
					<ProductsList page={1} sort={SortType.ByDateNewerFirst} category="newProducts" setMaxPages={setMaxPages}/>
					<Pagination maxPages={maxPages} baseUrl={"/noviProizvodi?page="} currentPage={page}/>
				</>:
				<div className="row g-2 justify-content-center">
					<NoProductsFound message="Nije pronadjen nijedan proizvod :("/>
				</div>
			}
		</div>
	);
};

export default NewestProducts;
