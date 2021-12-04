import React, {useState} from 'react';
import Select from 'react-select';
import '../Styles/select.scss';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { actionCreators } from "../state/index";

const options = [
  { value: '4', label: 'Batch 4' },
  { value: '5', label: 'Batch 5' },
  { value: '6', label: 'Batch 6' },
  { value: '7', label: 'Batch 7' },
];

function SelectComponent(){
  const tableTotalDataFromRedux = useSelector((state) => state.tableDataFromRedux);
  const tableSourceData = useSelector((state) => state.tableDataSource);

  const dispatch = useDispatch();
  const {tableDataForPageAction} = bindActionCreators(actionCreators, dispatch);
  const [selectedOption, setSelectedOption] = useState(null)
  const handleChange = (selectedOption) => {
    // this.setState({ selectedOption });
    // let realFiltered = [];
    let realFiltered = [];
    let sourceReduxTabeData = tableSourceData.map(e=>{return e});
    selectedOption.map(o=>{
      sourceReduxTabeData.map(e=>{
           if(o.value == e.batch){
             realFiltered.push(e)
           }
         })
    });
    
    tableDataForPageAction(realFiltered);
    setSelectedOption(selectedOption);
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