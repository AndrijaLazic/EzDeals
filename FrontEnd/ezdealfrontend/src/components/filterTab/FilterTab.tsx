import { useState } from "react";
import { SortType } from "../../dataModels/product";
import "./filterTab.css";
import SortSelection from "./sortSelection/sortSelection";

const FilterTab = (props:any) => {
	const [selectedSortOption, setSelectedSortOption] = useState({ value: SortType.ByDateNewerFirst, label: '📆Prvo noviji' });


	const sortOptions = [
		{ value: SortType.ByDateNewerFirst, label: '📆Prvo noviji' },
		{ value: SortType.ByDateOlderFirst, label: '📆Prvo stariji' },
		{ value: SortType.ByPriceAcending, label: '💸Cena rastuca' },
		{ value: SortType.ByPriceDecending, label: '💸Cena opadajuca' }
	];

	return (
		<div className='row m-3'>
			{selectedSortOption.label}
			<SortSelection setSelectedSortOption={setSelectedSortOption} selectedSortOption={selectedSortOption} sortOptions={sortOptions}/>
		</div>
	);
};

export default FilterTab;
