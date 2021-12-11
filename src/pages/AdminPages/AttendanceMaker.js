import { addDoc, collection, getDocs } from '@firebase/firestore';
import { Transfer, Switch, Table, Tag } from 'antd';
import difference from 'lodash/difference';
import { useEffect, useState } from 'react';
import db from '../../firebase';
import { DatePicker} from 'antd';
import { Button, Space } from 'antd';
import SelectComponent from '../../components/SelecReact';
import './Adminattendance.scss'
import Select from 'react-select';

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const mockTags = ['cat', 'dog', 'bird'];




const leftTableColumns = [
  {
    dataIndex: 'username',
    title: 'Name',
  },
  {
    dataIndex: 'tag',
    title: 'Tag',
    render: tag => <Tag>{tag}</Tag>,
  },
  {
    dataIndex: 'email',
    title: 'Description',
  },
];
const rightTableColumns = [
  {
    dataIndex: 'username',
    title: 'Name',
  },
];

function Attendance() {
    const [mockData, setMockData]=useState([]);
    const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key)
    const [targetKeys, setTargetKeys] = useState(originTargetKeys);
    const [disabled, setdisabled] = useState(false);
    const [showSearch, setshowSearch] = useState(true);
    const [userForAttendance, setUserForAttendance] = useState("");
    const [selectedOption, setSelectedOption] = useState(null)
    const [allUsers, setAllUSers] = useState([]);
    const [opt, setOpt] =useState([]);
    const [attendanceDataTosend, setattendanceDataTosend] = useState({});
    const [date, setDate]=useState({});
    const [uniqueBatches, setUniqueBatches] = useState([]);

         useEffect(() => {
    
            attendancequery()
       
        }, [])
    async function attendancequery(){
        const querySnapshot = await getDocs(collection(db, "users"));
         let userArray = [];
         querySnapshot.forEach((doc) => {
          userArray.push({email : doc.data().name, password : doc.data().password, username : doc.data().username , batch :doc.data().batch} ) 
         });
        let cloneMock = [];
        (userArray || []).map(o=>{
          cloneMock.push({
                key: o.email,
                username: o.username,
                email: o.email,
                batch: o.batch
                // disabled: i % 4 === 0,
                // tag: mockTags[i % 3],
              });
         });
         setMockData(cloneMock);
         window.cloneMockOriginalData = cloneMock;
         setAllUSers(cloneMock);
        let optionsFromData = cloneMock.map((o)=>{
           return { value: o.batch, label: `Batch ${o.batch ? o.batch : ""}`}
         });
         let duplicatesRemovedOptions =[];
         debugger
         optionsFromData.reduce((acc,curr)=>{
           if((typeof(curr.value)!= "undefined") && !(acc.includes(curr.value))) {
             acc.push(curr.value);
             duplicatesRemovedOptions.push(curr)
           }
           return acc
         },[]);
         setOpt(duplicatesRemovedOptions)
       }
    function onChangeDate(date, dateString) {
        setDate(dateString);
    };
    
  const onChangeTable = (nextTargetKeys) => {
    debugger;
    if (!date.length) {
      return false;
    }
    let alluserComaprision = [];
    setTargetKeys(nextTargetKeys);
    let createPatternAttendance = {};
    alluserComaprision = allUsers.map((o) => {
      return o;
    });
    let batchSuffixed = [];
    let absentCalculation = alluserComaprision.reduce((acc, curr) => {
      if (!nextTargetKeys.includes(curr.email)) {
        acc.push(curr.email + "#" + curr.batch + "#" + curr.username);
      }
      if (nextTargetKeys.includes(curr.email)) {
        batchSuffixed.push(curr.email + "#" + curr.batch + "#" + curr.username);
      }
      return acc;
    }, []);
    createPatternAttendance = {
      present: batchSuffixed,
      date: date,
      absent: absentCalculation,
      batchesConductedForTheDay : uniqueBatches
    };

    setattendanceDataTosend(createPatternAttendance);

    console.log(createPatternAttendance);
  };

  const triggerDisable = disabled => {
    setdisabled(disabled)  
  };

  const triggerShowSearch = showSearch => {
   setshowSearch(showSearch)  
  };

  const handleSubmitAttendance=()=>{
    debugger
    let dataCopy= Object.assign({}, attendanceDataTosend);
    saveAttendanceDataToFb(dataCopy)
    
  }
  const handleChangeSelect = (selectedOption) => {
    debugger
    let realfilter ;
    let filterItMock = selectedOption.reduce((acc,curr)=>{
       realfilter = window.cloneMockOriginalData.filter(q=>{
         return curr.value == q.batch
       });
       acc.push(...realfilter)
       return acc
    },[])
    let batches = selectedOption.map(o=>{
      return o.value
    });
    setMockData(filterItMock);
    setUniqueBatches(batches);
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };
  async function saveAttendanceDataToFb(obj){
    debugger
    const docRef = await addDoc(collection(db, "userattendance"), obj);
    console.log("Document written with ID: ", docRef.id);
  }
  
  const handleOnchangeSelect=()=>{
    debugger
  }
    return (
      <>
      <div className="attendanceSelectAndDatePicker">
      <Select
        value={selectedOption}
        onChange={handleChangeSelect}
        isSearchable
        isMulti
        options={opt}
        className={"select_custom_class"}
        placeholder={"Please select the batch here.."}
      />
      <DatePicker onChange={onChangeDate} />
      </div>
      
        <TableTransfer
          dataSource={mockData}
          targetKeys={targetKeys}
          disabled={disabled}
          showSearch={showSearch}
          onChange={onChangeTable}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
         <Button
            type="primary"
            onClick={() => handleSubmitAttendance()}
          >
            Click me!
          </Button>
      </>
    );
  }



export default Attendance