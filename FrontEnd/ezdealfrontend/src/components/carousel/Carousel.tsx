import { AppConfig } from "../../appConfig";
import { getImageUrl } from "../../assets/pictures.util";
import { ICarouselElement } from "../../dataModels/carouselElement";
import "./Carousel.css";



const Carousel = (props:any) => {
	const carouselData=AppConfig.getCarouselData();

	return (
		renderCarousel(carouselData)
	);
};


function renderCarousel(carouselData:ICarouselElement[]){
	if(carouselData.length==0)
		return;

	const htmlElements = carouselData.map((element) =>{
			return(
				<div className="carousel-item" key={element.id}>
					<img className="d-block w-100" src={getImageUrl(element.imagePath)} alt={element.id as unknown as string}/>
				</div>
			);
		}	
	);
	htmlElements[0]=<div className="carousel-item active" key={carouselData[0].id}>
							<img className="d-block w-100" src={getImageUrl(carouselData[0].imagePath)} alt={carouselData[0].id as unknown as string}/>
						</div>;

	const htmlElementsIndicators = carouselData.map((element) =>{
			return(
				<li data-target="#carouselExampleIndicators" key={element.id} data-slide-to={element.id}></li>
			);
		}	
	);	
	htmlElementsIndicators[0]=<li data-target="#carouselExampleIndicators" key={carouselData[0].id} data-slide-to="0" className="active"></li>;
	

	return (
		<div id="carouselExampleIndicators" className="carousel slide"  data-bs-ride="carousel">
			<ol className="carousel-indicators">
				{htmlElementsIndicators}
			</ol>
			<div className="carousel-inner">
				{htmlElements}
			</div>
			<a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="sr-only">Previous</span>
			</a>
			<a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="sr-only">Next</span>
			</a>
		</div>
	);
}

export default Carousel;
