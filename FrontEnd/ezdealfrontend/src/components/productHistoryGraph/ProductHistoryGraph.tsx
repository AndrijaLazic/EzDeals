import { useEffect, useState } from "react";
import "./ProductHistoryGraph.css";
import { productService } from "../../services/product.service";
import { IProductHistoryDocument } from "../../dataModels/product";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
	TimeScale
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
	TimeScale
);
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';



const ShopCard = (props: any) => {

	const [productHistory, setProductHistory] = useState<IProductHistoryDocument>();


	useEffect(() => {
		const getProductsHistory = async() => {

			const response = await productService.getProductHistory(props.product.historyID);

			if (response.error) {
				console.log(response);
				return;
			}

			setProductHistory(response.history as IProductHistoryDocument);
		};

		getProductsHistory();
	}, []);


	if (!productHistory)
		return;

	const options = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: 'Istorija cena',
				position: "bottom"
			},
			legend: {
				display: false
			}
		},
		tension: 0.3,
		scales: {
			x: {
				type:'time',
				time:{
					unit:'day'
				},
				min:new Date((new Date()).getTime() - 7 * 24 * 60 * 60 * 1000),
				max:new Date()
			}
		}
	};
	const graphData: { x: Date; y: string; }[]=[];

	productHistory.history.forEach(element => {
		graphData.push({
			x:new Date(element.date.split('T')[0]+"T00:00:00"),
			y:element.value
		});
	});

	graphData.push({
		x:new Date((new Date())),
		y:props.product.currentBestPrice
	});

	const data = {
		datasets: [
			{
				fill: true,
				data: graphData,
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	return (
		<div className="row mt-5 align-items-center">
			<Line options={options} data={data} />
		</div>
	);

};

export default ShopCard;
