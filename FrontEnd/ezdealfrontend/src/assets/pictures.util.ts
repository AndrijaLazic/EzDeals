export function getImageUrl(name:string){
	return new URL(name, import.meta.url).href;
}
