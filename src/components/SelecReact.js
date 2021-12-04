import React, {useState} from 'react';
import Select from 'react-select';
import '../Styles/select.scss';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from "../state/index";

const options = [
  { value: 'Batch 4', label: 'Batch 4' },
  { value: 'Batch 5', label: 'Batch 5' },
  { value: 'Batch 6', label: 'Batch 6' },
  { value: 'Batch 7', label: 'Batch 7' },
];

function SelectComponent(){
  const tableTotalDataFromRedux = useSelector((state) => state.tableDataFromRedux);
  const dispatch = useDispatch();
  const {tableDataForPageAction} = bindActionCreators(actionCreators, dispatch);
  const [selectedOption, setSelectedOption] = useState(null)
  const handleChange = (selectedOption) => {
    // this.setState({ selectedOption });
    setSelectedOption(selectedOption)
    console.log(`Option selected:`, selectedOption);
  };
 
    return (
      <Select
        value={selectedOption}
        onChange={handleChange}
        isSearchable
        isMulti
        options={options}
        className={"select_custom_class"}
        placeholder={"Please select the batch here.."}
      />
    );
  }


export default SelectComponent