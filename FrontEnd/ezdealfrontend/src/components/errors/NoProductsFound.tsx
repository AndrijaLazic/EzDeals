import { getImageUrl } from "../../assets/pictures.util";
import "./NoProductsFound.css";

const NoProductsFound = (props:any) => {

	return (
		<div className='col-12 col-lg-6 col-xxl-4 pt-2 '>
			<div className='errorCard'>

				<div className="col-sm productImage">
					<img className='card-img-top' src={getImageUrl("./pictures/productNotFoundErr.jpg")}/>
				</div>
		
				<h4>
					{props.message}
				</h4>
			</div>
		</div>
	);
};

export default NoProductsFound;
