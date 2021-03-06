import {useState, useEffect} from 'react';
import { Tabs } from 'antd';
import ChartUserdp from './ChartUserdp';
import { collection, getDocs } from '@firebase/firestore';
import db from '../../firebase';
import AmChartDemo from './AmchartTest';
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const TabSwitchers = () => {
  const [tabBatchesNames, settabBatchesNames] = useState([]);
  const [batchesToPass, setbatchesToPass] = useState([]);
  useEffect(() => {
    async function getallData(){
      const querySnapshot = await getDocs(collection(db, "studentTaskDetails"));
       let userArray = [];
       querySnapshot.forEach((doc) => {
        userArray.push(doc.data()) 
       });
       debugger
       let batchesCalc = userArray.reduce((acc,curr)=>{
          if(!acc.includes(curr.batch)){
            acc.push(curr.batch)
          }
          return acc
       },[]).filter(o=>{return o!= undefined});
       setbatchesToPass(batchesCalc);
       let batchPrepender = batchesCalc.map(o=>{
         return `Batch ${o}`
       })

       settabBatchesNames(batchPrepender);
       
     };
     getallData();
  }, [])

  return (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab={"Batch 5"} key="1">
     {/* <ChartUserdp batchNoFromTab={"5"}/> */}
     <AmChartDemo batchNoFromTab={"5"}/>
    </TabPane>
    <TabPane tab={"Batch 6"} key="2">
    {/* <ChartUserdp batchNoFromTab={"7"}/> */}
    <AmChartDemo batchNoFromTab={"6"}/>
    </TabPane>
    <TabPane tab={"Batch 7"} key="3">
    {/* <ChartUserdp batchNoFromTab={"7"}/> */}
    <AmChartDemo batchNoFromTab={"7"}/>
    </TabPane>
    {/* <TabPane key="3">
      Content of Tab Pane 3
    </TabPane> */}
  </Tabs>
)};

export default TabSwitchers;