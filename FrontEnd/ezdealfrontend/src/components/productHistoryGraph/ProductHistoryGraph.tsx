import { useEffect, useState } from "react";
import "./ProductHistoryGraph.css";
import { productService } from "../../services/product.service";
import { IProductHistoryDocument } from "../../dataModels/product";
import AreaGraph from "../areaGraph/AreaGraph";

const ShopCard = (props:any) => {

	const [productHistory, setProductHistory] = useState<IProductHistoryDocument>();


	useEffect(() => {
		const getProductsHistory = async() => {

			const response = await productService.getProductHistory(props.historyID);

			if (response.error) {
				console.log(response);
				return;
			}

			setProductHistory(response.history as IProductHistoryDocument);
		};

		getProductsHistory();
	}, []);


	if(!productHistory)
		return;

	return (
		<div className="row gx-4 gx-lg-5 align-items-center">
			<AreaGraph/>
		</div>
	);
	
};

export default ShopCard;
