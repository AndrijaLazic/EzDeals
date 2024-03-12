import { useEffect, useState } from "react";
import { SortType } from "../../dataModels/product";
import "./filterTab.css";
import SortSelection from "./sortSelection/sortSelection";

const FilterTab = (props:any) => {
	
	const sortOptions = [
		{ value: SortType.ByDateNewerFirst, label: '📆Prvo noviji' },
		{ value: SortType.ByDateOlderFirst, label: '📆Prvo stariji' },
		{ value: SortType.ByPriceAcending, label: '💸Cena rastuca' },
		{ value: SortType.ByPriceDecending, label: '💸Cena opadajuca' }
	];

	const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[2]);
	
	function handleSortChange(value:any){
		setSelectedSortOption(value);
		props.setCurrentSortParam(value.value);
	}
	
	
	return (
		<div className='row m-3'>
			<SortSelection handleSortChange={handleSortChange} selectedSortOption={selectedSortOption} sortOptions={sortOptions}/>
		</div>
	);
};

export default FilterTab;
