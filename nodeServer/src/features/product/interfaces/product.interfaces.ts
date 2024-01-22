import { Document } from "mongoose";
import { ObjectId } from "mongodb";

export interface IProductDocument extends IShortProductDocument {
	_id?: string | ObjectId;
	prices: Price[];
	historyID: string | ObjectId;
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

export interface IShortProductDocument extends Document {
	_id?: string | ObjectId;
	name: string;
	image: string;
	currentBestPrice: string;
}

export interface IProductHistoryDocument extends Document {
	_id?: string | ObjectId;
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
