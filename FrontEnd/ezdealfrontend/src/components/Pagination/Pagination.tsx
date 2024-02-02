import "./Pagination.css";

const Pagination = (props: any) => {

	const maxPages: number = props.maxPages as number || 1;
	const baseUrl: string = props.url || "#";
	const pageItems = [];

	for (let index = 1; index < maxPages + 1; index++) {
		const newUrl: string = baseUrl + index;
		pageItems.push(
			<li className="page-item" key={index}><a className="page-link" href={newUrl}>{index}</a></li>
		);

	}

	return (
		<div className="row g-2">
			<ul className="pagination justify-content-center">
				<li className="page-item">
					<a className="page-link" href="#" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
						<span className="sr-only">Prethodna</span>
					</a>
				</li>
				{pageItems}
				<li className="page-item">
					<a className="page-link" href="#" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
						<span className="sr-only">Sledeca</span>
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Pagination;
