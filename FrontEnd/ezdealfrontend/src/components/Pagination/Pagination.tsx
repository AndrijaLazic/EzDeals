import { useSearchParams } from "react-router-dom";
import "./Pagination.css";

const Pagination = (props: any) => {

	const maxPages: number = props.maxPages as number || 1;
	const baseUrl: string = props.baseUrl;
	let pageItems = [];
	const [searchParams, setSearchParams] = useSearchParams();
	let currentPage:number=1;

	if(searchParams.get('page'))
		currentPage=parseInt(searchParams.get('page')!);


	for (let index = 1; index < maxPages + 1; index++) {
		const newUrl: string = baseUrl + index;
		pageItems.push(
			<li className="page-item" key={index}><a className="page-link" href={newUrl}>{index}</a></li>
		);
	}

	pageItems[currentPage-1]=<li className="page-item active" key={currentPage-1}><a className="page-link" href={baseUrl + currentPage}>{currentPage}</a></li>;

	if(maxPages>8){
		pageItems=fitPagination(pageItems,currentPage,maxPages);
	}

	return (
		<div className="row g-2">
			<ul className="pagination justify-content-center">
				<li className="page-item">
					<a className="page-link" href={baseUrl+1} aria-label="Previous">
						<span>&laquo;</span>
					</a>
				</li>
				{pageItems}
				<li className="page-item">
					<a className="page-link" href={baseUrl+maxPages} aria-label="Next">
						<span>&raquo;</span>
		
					</a>
				</li>
			</ul>
		</div>
	);
};

function fitPagination(pageItems:any[],currentPage:number,maxPages:number){
	let newArray=[];

	if(currentPage<5){
		newArray=pageItems.slice(0, 5);
		newArray.push(
			<li className="page-item"><a className="page-link">...</a></li>
		);
	}
	else if(currentPage>maxPages-3){
		newArray=pageItems.slice(maxPages-4,maxPages);
		newArray.unshift(
			<li className="page-item"><a className="page-link">...</a></li>
		);
	}
	else{
		newArray=pageItems.slice(currentPage-3,currentPage+2);
		newArray.unshift(
			<li className="page-item"><a className="page-link">...</a></li>
		);
		newArray.push(
			<li className="page-item"><a className="page-link">...</a></li>
		);
	}


	return newArray;

}

export default Pagination;
