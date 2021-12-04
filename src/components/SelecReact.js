import React, {useState} from 'react';
import Select from 'react-select';
import '../Styles/select.scss'
const options = [
  { value: 'Batch 4', label: 'Batch 4' },
  { value: 'Batch 5', label: 'Batch 5' },
  { value: 'Batch 6', label: 'Batch 6' },
];

function SelectComponent(){
  // const { selectedOption } = this.state;
  // state = {
  //   selectedOption: null,
  // };
  const [selectedOption, setSelectedOption] = useState(null)
  const handleChange = (selectedOption) => {
    debugger
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