import { Price } from "../../dataModels/product";
import "./ShopCard.css";
import { Link } from "react-router-dom";

const ShopCard = (props:any) => {

	const price:Price=props.price as Price;

	return (
		<div className='row m-2 p-2 shopCard'>
			<div className="col-lg-5 d-flex justify-content-center">
				<img className='shopImage' src={price.shopImageURL}/>
			</div>
			<div className="col-lg-7">
				<div className='row '>
					<h4 className="priceValue">
						{price.value}
					</h4>
				</div>
				<div className='row  priceCheck'>
					<Link to={price.dealURL}>
						Proveri cenu
					</Link>
				</div>
				
			</div>
		</div>
	);
};

export default ShopCard;
