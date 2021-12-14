import React ,{useEffect, useState}from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Spin } from 'antd';
import { Bar } from 'react-chartjs-2';
import randomColor from 'randomcolor';
import faker from 'faker';
import { collection, getDocs } from '@firebase/firestore';
import db from '../../firebase';
import './chart.css'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


let  options = {
  responsive: true,
  scales: {
    x: {
      min :0
    },
    y: {
      max: 100,
    },
  },
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};


let sampleObjToCreate = {
  label: 'Name',
  data: [70],
  backgroundColor: 'rgba(53, 162, 235, 0.5)',
};
const labels = ["Self Assesment"];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [
        873,
        46,
        243,
        509,
        277,
        961,
        907
    ],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Dataset 3',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
export default function ChartUserdp({batchNoFromTab}) {
  const [batchNoOnClickFromTab, setbatchNoOnClickFromTab] = useState(batchNoFromTab|| 5);
  const [dataForMembers,setDataForMembers] = useState(data);
  const [chartLoadChecker, setchartLoadChecker] = useState(false);
  const [optionsDynamic, setOptionsDynamic] = useState(options);
  useEffect(()=>{
    debugger
    if(batchNoFromTab){
      setbatchNoOnClickFromTab(batchNoFromTab)
    }
    
  },[]);
  useEffect(() => {
    debugger
    async function getallData(){
      const querySnapshot = await getDocs(collection(db, "studentTaskDetails"));
       let userArray = [];
       querySnapshot.forEach((doc) => {
        userArray.push(doc.data()) 
       });
       debugger
       let membersFilterFromBatch = userArray.filter(filterIt=>{
         return filterIt.batch == batchNoOnClickFromTab
       });
       let memberNamesFromBatch = [...new Set (membersFilterFromBatch.map(o=>{
         return o.username
       }))];
       let calculateByStudent = memberNamesFromBatch.map((member) => {
         let count =0;
         let specifiedMemberOnloopFilter = membersFilterFromBatch
           .filter((a) => {
             return a.username == member;
           })
           .reduce((acc, filteredForMember) => {
             acc += filteredForMember.slider;
             count++;
             return acc;
           }, 0);

         return { label: member, data: [((specifiedMemberOnloopFilter/((membersFilterFromBatch.length)*100))*100).toFixed(1)],  backgroundColor: randomColor({
          luminosity: 'dark',
          format: 'rgba',
          alpha: 0.5 // e.g. 'rgba(9, 1, 107, 0.5)',
       })};
       });

       let preparedDataSet = {
         labels, 
         datasets : calculateByStudent
       };
       let  optionsGenerated = {
        responsive: true,
        scales: {
          x: {
            min :0
          },
          y: {
            max: 100,
          },
        },
        plugins: {
          legend: {
            position: 'top' ,
          },
          title: {
            display: true,
            text: `TOTAL DAYS - ${membersFilterFromBatch.length}`,
          },
        },
      };
debugger
       setOptionsDynamic(optionsGenerated);
       setDataForMembers(preparedDataSet);
       setchartLoadChecker(true);
debugger
      //  let totalValueCalculator = batchesCalc.map(batchNo=>{

      //  })
       console.log(userArray);
     };
     getallData();
  }, [batchNoOnClickFromTab]);
  debugger
  


  return (
    <div className="chartMaster">
    {chartLoadChecker ? (<Bar options={optionsDynamic} width={400} data={dataForMembers}/>) : (<div className="spinner_chart"><Spin/></div>)}
    </div>
    );
}
