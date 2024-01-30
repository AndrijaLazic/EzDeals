
export interface IProduct extends IShortProduct {
	_id?: string ;
	prices: Price[];
	historyID: string ;
	dateAdded: string;
	lastScraped: string;
	primaryCategory: string;
}

export interface Price {
	value: string;
	shopname: string;
	dealURL: string;
	shopImageURL: string;
}

export interface HistoryId {
	$oid: string;
}

export interface IShortProduct {
	_id?: string ;
	name: string;
	image: string;
	currentBestPrice: number;
	dateAdded: Date | string;
}

export interface IProductHistoryDocument{
	_id?: string;
	history: HistoryNode[];
}

export interface HistoryNode {
	date: string;
	value: string;
}

export interface SearchInfo {
	pageNum: number;
	sortOrder: SortType;
	productCategory: string;
	numberOfProducts: number;
	searchString: string;
}

export enum SortType {
	ByPriceAcending = "ByPriceAcending",
	ByPriceDecending = "ByPriceDecending",
	ByDateNewerFirst = "ByDateNewerFirst",
	ByDateOlderFirst = "ByDateOlderFirst"
}
