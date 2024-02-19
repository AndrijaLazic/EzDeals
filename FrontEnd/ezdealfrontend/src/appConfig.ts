import { ICategory } from "./dataModels/category";

class appConfig {
	private categories:ICategory[];
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
		];
	}

	public getCategories(): ICategory[] {
		return this.categories;
	}

	public getCategory(urlParam:string){
		return this.categories.filter(
			category => category.urlParam === urlParam)[0];
	}

}

export const AppConfig: appConfig = new appConfig();
