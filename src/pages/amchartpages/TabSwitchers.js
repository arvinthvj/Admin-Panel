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
    <TabPane tab={tabBatchesNames[0]} key="1">
     <ChartUserdp batchNoFromTab={batchesToPass[0]}/>
     {/* <AmChartDemo batchNoFromTab={batchesToPass[0]}/> */}
    </TabPane>
    <TabPane tab={tabBatchesNames[1]} key="2">
    <ChartUserdp batchNoFromTab={batchesToPass[1]}/>
    {/* <AmChartDemo batchNoFromTab={batchesToPass[1]}/> */}
    </TabPane>
    {/* <TabPane key="3">
      Content of Tab Pane 3
    </TabPane> */}
  </Tabs>
)};

export default TabSwitchers;