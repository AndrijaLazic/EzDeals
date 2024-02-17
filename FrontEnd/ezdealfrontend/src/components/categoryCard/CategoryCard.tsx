import { ICategory } from "../../dataModels/category";
import "./CategoryCard.css";
import { Link } from "react-router-dom";
import {getImageUrl} from "../../assets/pictures.util";

const CategoryCard = (props:any) => {

	const category:ICategory=props.category as ICategory;

	return (
		<div className='col-12 col-lg-6 col-xxl-4 pt-2 '>
			<div className='categoryCard'>
				<Link to={category.url}>
				
					<div className="col-sm productImage">
						<img className='card-img-top' src={getImageUrl(category.imagePath)}/>
					</div>
			
					<h4 className="categoryName">
						{category.name}
					</h4>
				</Link>
			</div>
		</div>
	);
};

export default CategoryCard;
