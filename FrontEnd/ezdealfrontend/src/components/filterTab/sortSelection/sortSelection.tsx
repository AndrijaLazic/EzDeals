import Select from "react-select";
import "./sortSelection.css";

const SortSelection = (props:any) => {

	

	return (
		<div className='col-4'>
			<Select defaultValue={props.selectedSortOption} onChange={props.setSelectedSortOption} options={props.sortOptions}/>
		</div>
	);
};

export default SortSelection;
