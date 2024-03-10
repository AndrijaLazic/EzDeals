import Select from "react-select";
import "./sortSelection.css";

const SortSelection = (props:any) => {

	function changeSelection(value:any){
		if(value.value!==props.selectedSortOption.value){
			props.handleSortChange(value);
		}	
	}

	return (
		<div className='col-12 col-lg-6 col-xxl-4'>
			<Select defaultValue={props.selectedSortOption} onChange={changeSelection} options={props.sortOptions}/>
		</div>
	);
};

export default SortSelection;
