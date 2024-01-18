import { Document } from "mongoose";
import { ObjectId } from "mongodb";

export interface IProductDocument extends Document {
	_id?: string | ObjectId;
	name: string
	image: string
	prices: Price[]
	historyID: string | ObjectId
	dateAdded: string
	lastScraped: string
	primaryCategory: string
}

export interface Price {
	value: string
	shopname: string
	dealURL: string
	shopImageURL: string
 }
 
 export interface HistoryId {
	$oid: string
 }

