import "./ShortProduct.css";
import { IShortProduct } from '../../dataModels/product';
import { Link } from "react-router-dom";

const ShortProduct = (props:any) => {

	const productLink="/proizvod/"+props.product._id;

	const product:IShortProduct=props.product as IShortProduct;
	return (
		<div className='col-12 col-lg-4 col-xxl-2 pt-2 '>
			<div className='shortItem'>
				<Link to={productLink}><span>
				
					<div className="col-sm productImage">
						<img className='card-img-top' src={product.image}/>
					</div>
			
					<div className='productData'>
						<div className="productName"><h5>{product.name}</h5></div>

						<div className='productPrice'>{product.currentBestPrice} din.</div>
						
					</div>
				

				</span></Link>
			</div>
		</div>
	);
};

export default ShortProduct;
