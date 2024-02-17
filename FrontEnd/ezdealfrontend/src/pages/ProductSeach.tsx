import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IShortProduct, SearchInfo, SortType } from '../dataModels/product';
import ProductsList from '../components/ListOfProducts/ProductsList';
import Pagination from '../components/Pagination/Pagination';
import NoProductsFound from '../components/errors/NoProductsFound';
import { productService } from '../services/product.service';

const CategoryProducts = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get('page') || 1;
	const searchString = searchParams.get('searchString') || "";
	const[maxPages,setMaxPages]=useState(1);
	const [products, setProducts] = useState<IShortProduct[]>([]);

	async function startSearch(){
		const body:SearchInfo={
			pageNum: 1,
			sortOrder: SortType.ByPriceAcending,
			productCategory: "",
			numberOfProducts: 24,
			searchString: searchString
		};

		const response = await productService.getProductsFromSearch(body);

		if (response.error) {
			return console.log(response);
		}
		setProducts(response.products);

		setMaxPages(response.maxPages);
	}


	useEffect(() => {
		startSearch();
	}, []);

	useEffect(() => {
		startSearch();
	}, [searchParams]);

	

	return (
		<div className='container'>
			<div className="row g-2"><h2>Pretraga</h2></div>
			{products.length!=0 ? 
				<>
					<ProductsList page={page} products={products} sort={SortType.ByPriceAcending} setMaxPages={setMaxPages}/>
					<Pagination maxPages={maxPages} baseUrl={"/pretraga?searchString="+searchString+"&page="}/>
				</>:
				<div className="row g-2 justify-content-center">
					<NoProductsFound message="Nije pronadjen nijedan proizvod :("/>
				</div>
			}
		</div>
	);
};

export default CategoryProducts;
