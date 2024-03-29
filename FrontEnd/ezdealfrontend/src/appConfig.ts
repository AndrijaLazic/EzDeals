import { ICarouselElement } from "./dataModels/carouselElement";
import { ICategory } from "./dataModels/category";

class appConfig {
	private categories:ICategory[];
	private carouselElements:ICarouselElement[];

	constructor() {
		this.categories=[
			{
				name:"Monitori",
				imagePath:"./pictures/CategoryMonitori.png",
				url:"/kategorije/Monitori?page=1",
				urlParam:"Monitori"
			},
			{
				name:"Racunarske komponente",
				imagePath:"./pictures/CategoryRacunarskeKomponente.png",
				url:"/kategorije/RacunarskeKomponente?page=1",
				urlParam:"RacunarskeKomponente"
			},
			{
				name:"Slusalice",
				imagePath:"./pictures/CategorySlusalice.png",
				url:"/kategorije/Slusalice?page=1",
				urlParam:"Slusalice"
			},
			{
				name:"Laptopovi",
				imagePath:"./pictures/CategoryLaptopovi.jpg",
				url:"/kategorije/Laptopovi?page=1",
				urlParam:"Laptopovi"
			},
			{
				name:"Mobilni telefoni",
				imagePath:"./pictures/CategoryMobilniTelefoni.jpg",
				url:"/kategorije/MobilniTelefoni?page=1",
				urlParam:"MobilniTelefoni"
			},
			{
				name:"Eksterni diskovi",
				imagePath:"./pictures/CategoryEksterniDiskovi.jpg",
				url:"/kategorije/EksterniDiskovi?page=1",
				urlParam:"EksterniDiskovi"
			}
		];
		this.carouselElements=[
			{
				imagePath:"./pictures/carousel/carouselDefault.jpg",
				id:0
			},
			{
				imagePath:"./pictures/CategoryRacunarskeKomponente.png",
				id:1
			}
		];
	}

	public getCategories(): ICategory[] {
		return this.categories;
	}

	public getCategory(urlParam:string){
		return this.categories.filter(
			category => category.urlParam === urlParam)[0];
	}

	public getCarouselData(): ICarouselElement[] {
		return this.carouselElements;
	}
}

export const AppConfig: appConfig = new appConfig();
