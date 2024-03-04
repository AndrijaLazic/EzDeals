import { Link } from "react-router-dom";
import "./Pagination.css";

const Pagination = (props: any) => {

	const maxPages: number = +(props.maxPages || 1);
	const baseUrl: string = props.baseUrl;
	let pageItems = [];
	const currentPage:number=+(props.currentPage || 1);


	for (let index = 1; index < maxPages + 1; index++) {
		const newUrl: string = baseUrl + index;
		pageItems.push(
			<li className="page-item" key={index}><Link className="page-link" to={newUrl}>{index}</Link></li>
		);
	}

	pageItems[currentPage-1]=<li className="page-item active" key={currentPage}><Link className="page-link" to={baseUrl + currentPage}>{currentPage}</Link></li>;

	if(maxPages>8){
		pageItems=fitPagination(pageItems,currentPage,maxPages,baseUrl);
	}

	const previousPage= currentPage==1 ? 1 : currentPage-1;
	const nextPage= currentPage==maxPages ? maxPages : currentPage+1;

	return (
		<div className="row g-2">
			<ul className="pagination justify-content-center">
				<li className="page-item" key={"PreviousPage"}>
					<Link className="page-link" to={baseUrl+previousPage} aria-label="Previous">
						<span>&laquo;</span>
					</Link>
				</li>
				{pageItems}
				<li className="page-item" key={"NextPage"}>
					<Link className="page-link" to={baseUrl+nextPage} aria-label="Next">
						<span>&raquo;</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

function fitPagination(pageItems:any[],currentPage:number,maxPages:number,baseUrl:string){
	let newArray=[];

	if(currentPage<5){
		newArray=pageItems.slice(0, 5);
		newArray.push(
			<li className="page-item" key={"dotsRight"}><a className="page-link">...</a></li>
		);
		newArray.push(
			<li className="page-item" key={"lastPage"}><Link className="page-link" to={baseUrl+maxPages}>{maxPages}</Link></li>
		);
	}
	else if(currentPage>maxPages-3){
		newArray=pageItems.slice(maxPages-4,maxPages);
		newArray.unshift(
			<li className="page-item" key={"dotsLeft"}><a className="page-link">...</a></li>
		);
		newArray.unshift(
			<li className="page-item" key={"firstPage"}><Link className="page-link" to={baseUrl+1}>{1}</Link></li>
		);
	}
	else{

		newArray=pageItems.slice(currentPage-3,currentPage+2);
		newArray.push(
			<li className="page-item" key={"dotsRight"}><a className="page-link">...</a></li>
		);
		newArray.unshift(
			<li className="page-item" key={"dotsLeft"}><a className="page-link">...</a></li>
		);
		newArray.push(
			<li className="page-item" key={"lastPage"}><Link className="page-link" to={baseUrl+maxPages}>{maxPages}</Link></li>
		);
		newArray.unshift(
			<li className="page-item" key={"firstPage"}><Link className="page-link" to={baseUrl+1}>{1}</Link></li>
		);
	}


	return newArray;

}

export default Pagination;
