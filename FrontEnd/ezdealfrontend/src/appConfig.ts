import { ICategory } from "./dataModels/category";

class appConfig {
	private categories:ICategory[];
	constructor() {
		this.categories=[
			{
				name:"Monitori",
				imagePath:"../../../public/pictures/CategoryMonitori.png",
				url:"/kategorije/Monitori?page=1",
				urlParam:"Monitori"
			},
			{
				name:"Racunarske komponente",
				imagePath:"../../../public/pictures/CategoryRacunarskeKomponente.png",
				url:"/kategorije/RacunarskeKomponente?page=1",
				urlParam:"RacunarskeKomponente"
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
