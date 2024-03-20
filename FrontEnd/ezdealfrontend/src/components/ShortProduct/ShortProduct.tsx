import "./ShortProduct.css";
import { IShortProduct } from '../../dataModels/product';
import { Link } from "react-router-dom";

const ShortProduct = (props:any) => {
	const product:IShortProduct=props.product as IShortProduct;
	const productLink="/kategorije/"+product.primaryCategory+"/"+product._id;

	return (
		<div className='col-12 col-lg-4 col-xxl-2 p-2 '>
			<div className='shortItem'>
				<Link to={productLink}>
				
					<div className="col-sm productImage">
						<img className='card-img-top' src={product.image}/>
					</div>
			
					<div className='productData'>
						<div className="productName"><p>{product.name}</p></div>

						<div className='productPrice'><p>{product.currentBestPrice} din.</p></div>
						
					</div>
				

				</Link>
			</div>
		</div>
	);
};

export default ShortProduct;
