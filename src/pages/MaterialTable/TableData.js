import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { collection, getDocs } from "@firebase/firestore";
import db from "../../firebase";
import { Avatar } from "antd";
import { Tag, Divider } from "antd";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Pagination } from 'antd';
import { fontWeight } from "@mui/system";
import {excelExport, data as dataFromExcel, SETTINGS_FOR_EXPORT} from '../../Export/ExportData';
import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { alignment, defaultDataType } from 'export-xlsx';


var data = [
  {
    name: "Monica",
    steps: 45688,
    pictureSettings: {
      src: "https://www.amcharts.com/wp-content/uploads/2019/04/monica.jpg",
    },
  },
];
function createData(
  name,
  overallAssignmentcalc,
  overallAttendance,
  overallAbsent,
  fromTrainer,
  pictureSettings
) {
  return {
    name,
    overallAssignmentcalc,
    // fat,
    overallAttendance,
    overallAbsent,
    fromTrainer,
    pictureSettings: "admin@citma",
    history: [
      {
        date: "2020-01-05",
        daywiseselfassessment: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        daywiseselfassessment: "Anonymous",
        amount: 1,
      },
    ],
  };
}
let tagcolors = ["green", "magenta", "yellow"];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const handleExport = (name, batchno, absentdays, data,overallAssignmentcalc)=>{
    let SETTINGS_FOR_EXPORT_HERE = {
      // Table settings
      fileName: `${name}'s Record From ${batchno}`,
      workSheets: [
        {
          sheetName: `${name}`,
          startingRowNumber: 2,
          gapBetweenTwoTables: 2,
          tableSettings: {
            data: {
              importable: true,
              tableTitle: `${name}'s Record  From Batch ${batchno} -- Overall Self assessment in percentage is ${overallAssignmentcalc}% -- (Absent or unfilled for ${absentdays} days)`,
              notification:
                "Note: Sorted from the latest date to the oldest date!",
              headerGroups: [
                {
                  name: "Attendance",
                  key: "score",
                },
              ],
              headerDefinition: [
                {
                  name: "Date",
                  key: "date",
                  width: 18,
                  style: { alignment: alignment.middleCenter },
                },
                {
                  name: "Date Wise Assessment",
                  key: "daywiseselfassessment",
                  width: 18,
                  style: { alignment: alignment.middleCenter },
                },
              ],

              // {
              //   name: 'Id',
              //   key: 'id',
              //   width: 25,
              //   hierarchy: true,
              //   checkable: true,
              // },
              // {
              //   name: 'Number',
              //   key: 'number',
              //   width: 18,
              //   checkable: true,
              //   style: { alignment: alignment.middleCenter },
              // },
              // {
              //   name: 'Name',
              //   key: 'name',
              //   width: 18,
              //   style: { alignment: alignment.middleCenter },
              // },
              // {
              //   name: 'A',
              //   key: 'a',
              //   width: 18,
              //   groupKey: 'score',
              //   dataType: defaultDataType.number,
              //   selfSum: true,
              //   editable: true,
              // },
              // {
              //   name: 'B',
              //   key: 'b',
              //   width: 18,
              //   groupKey: 'score',
              //   dataType: defaultDataType.number,
              //   selfSum: true,
              //   editable: true,
              // },
              // {
              //   name: 'Total',
              //   key: 'total',
              //   width: 18,
              //   dataType: defaultDataType.number,
              //   selfSum: true,
              //   rowFormula: '{a}+{b}',
              // },
            },
          },
        },
      ],
    };
    let dataForExcel = [
      {
        data: data.map((element, key)=>{
          return {
            id : key, 
            date: element.date,
            daywiseselfassessment: `${element.daywiseselfassessment}%`,
        }
        })
        // [
        //   {
        //     id: 1,
        //     level: 0,
        //     number: '0001',
        //     name: '0001',
        //     a: 50,
        //     b: 45,
        //     total: 95,
        //   },
        //   {
        //     id: 2,
        //     parentId: 1,
        //     level: 1,
        //     number: '0001-1',
        //     name: '0001-1',
        //     a: 20,
        //     b: 25,
        //     total: 45,
        //   },
        //   {
        //     id: 3,
        //     parentId: 2,
        //     level: 1,
        //     number: '0001-2',
        //     name: '0001-2',
        //     a: 30,
        //     b: 20,
        //     total: 50,
        //   },
        //   {
        //     id: 4,
        //     level: 0,
        //     number: '0002',
        //     name: '0002',
        //     a: 40,
        //     b: 40,
        //     total: 80,
        //   }
        // ]
      }
    ];
    debugger
    excelExport.downloadExcel(SETTINGS_FOR_EXPORT_HERE, dataForExcel);
  }
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          <Avatar
            style={{ marginRight: "1rem" }}
            size={30}
            src={require(`../Images/${row.pictureSettings}.jpeg`).default}
          />
          {row.name}
        </TableCell>
        <TableCell align='center'>
          <Tag color='green'>{row.batchNo}</Tag>
        </TableCell>
        <TableCell align='center'>{row.overallAssignmentcalc+"%"}</TableCell>
        {/* <TableCell align="right">{row.fat}</TableCell> */}
        <TableCell align='center'>{row.overallAttendance}</TableCell>
        <TableCell align='center'>{row.overallAbsent}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography style={{display: "flex", justifyContent:"space-between"}} className="tabledatahistorytypo" variant='h6' gutterBottom component='div'>
                <div>
              {row.name}'s  History <span style={{fontSize:"15px"}}>(Data filled by {row.name} on the particular days)</span> <span><div> <Chip label={`Absent or unfilled for ${row.overallAbsent} days`} size="small" variant="outlined" color="primary" /></div></span>
              </div>
              <div>
              <Button onClick={()=>{handleExport(row.name,row.batchNo,row.overallAbsent,row.history,row.overallAssignmentcalc)}} type="primary" shape="round" icon={<DownloadOutlined />} size={20}>
          Export {row.name}'s Record
        </Button>
              </div>
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>Date (sorted from the latest to the oldest)</TableCell>
                    <TableCell align='center'>
                      Day wise Self Assessment
                    </TableCell>
                    <TableCell align='left'>Topics Covered On the day</TableCell>
                    {/* <TableCell align='center'>Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row' align='left'>
                        {historyRow.date}
                      </TableCell>
                      
                      <TableCell align='center'>
                        {historyRow.daywiseselfassessment}%
                      </TableCell>
                      <TableCell align='left'>
                        {(historyRow.topicsCovered || []).map((element, index)=>(
                          <Tag color={tagcolors[index]}>{element}</Tag>
                        ))}
                      </TableCell>
                      
                      {/* <TableCell align='center'>
                        {Math.round(historyRow.amount * row.fromTrainer * 100) /
                          100}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99, "")];

function CollapsibleTable({ batchNoFromTab }) {
  const [batchNoOnClickFromTab, setbatchNoOnClickFromTab] = useState(
    batchNoFromTab || 5
  );
  const [rowsState, setRowsState] = useState(rows);
  const [dataForMembers, setDataForMembers] = useState(data);
  const [chartLoadChecker, setchartLoadChecker] = useState(false);
  const [TotalDaysForTheBatch, setTotalDaysForTheBatch] = useState(0);
  const [totalManipulatedData, setTotalManipulatedData] =useState([]);
  const [fromelementForPage , setfromelementForPage] = useState(0);
  const [initialTenPagination, setinitialTenPagination] = useState(6);
  const [defautLimit, setdefautLimit] = useState(6);

  
  

  function onShowSizeChange(current, pageSize) {
    debugger
    let previousInitialState = current*defautLimit;
    let previousfromelementForPage = (current-1)*defautLimit;
    setinitialTenPagination(Number(previousInitialState));
    setfromelementForPage(previousfromelementForPage);
    console.log(current, pageSize);
  }

  useEffect(() => {
    //totally this function is a pagination handler
    let dataStoreByPage = [];
    if(totalManipulatedData.length){
      dataStoreByPage = totalManipulatedData.filter((element, index)=>{
        return index >= fromelementForPage && index < initialTenPagination
      });
    }
    setRowsState(dataStoreByPage)
  }, [totalManipulatedData, fromelementForPage, initialTenPagination])



  useEffect(() => {
    async function getallData() {
      const querySnapshot = await getDocs(collection(db, "studentTaskDetails"));
      let userArray = [];
      let obj ={};
      querySnapshot.forEach((doc) => {
        obj = Object.assign(doc.data(),{})
        obj.slider = Number(obj.slider);
        userArray.push(obj);
      });

      let membersFilterFromBatch = userArray
        .filter((filterIt) => {
          return filterIt.batch;
        })
        .sort((a, b) => {
          if (a.batch > b.batch) {
            return 1;
          }
          if (b.batch > a.batch) {
            return -1;
          }
        });

      let memberNamesFromBatch = [
        ...new Set(
          membersFilterFromBatch.map((o) => {
            return o.username;
          })
        ),
      ];
      let calculateTheDaysUNique = [
        ...new Set(
          membersFilterFromBatch.map((o) => {
            return o["Date-Pick"];
          })
        ),
      ];
      let calculateByStudent = memberNamesFromBatch.map((member) => {
        let count = 0;
        let userEmail = "";
        let batchNo = "";
        let specifiedMemberOnloopFilter = membersFilterFromBatch.filter((a) => {
          userEmail = a.name;
          return a.username == member;
        });
        let reduced = specifiedMemberOnloopFilter.reduce(
          (acc, filteredForMember) => {
            userEmail = filteredForMember.email;
            acc += filteredForMember.slider;
            count++;
            batchNo = filteredForMember.batch;
            return acc;
          },
          0
        );
        let months = [
          "jan",
          "feb",
          "mar",
          "apr",
          "jun",
          "jul",
          "aug",
          "sep",
          "oct",
          "nov",
          "dec",
        ];
        let collectVar = [];
        let totalDaysTakenForTheBatch = userArray.reduce((acc,curr)=>{
          if(!acc.includes(curr["Date-Pick"]) && curr.batch == batchNo){
            acc.push(curr["Date-Pick"]);
          }
          return acc
        }, []);
        months.map((element) => {
          let subCollVar = [];

          specifiedMemberOnloopFilter.map((subelement) => {
            if (
              element.toLowerCase() ==
              subelement["Date-Pick"].split(" ")[1].toLowerCase()
            ) {
              subCollVar.push(subelement);
            }
          });
          subCollVar = subCollVar
            .sort((a, b) => {
              if (
                Number(a["Date-Pick"].split(" ")[2]) >
                Number(b["Date-Pick"].split(" ")[2])
              ) {
                return 1;
              }
              if (
                Number(b["Date-Pick"].split(" ")[2]) >
                Number(a["Date-Pick"].split(" ")[2])
              ) {
                return -1;
              }
            })
            .reverse();
          if (subCollVar.length) {
            collectVar = [...collectVar, ...subCollVar];
          }
        });
        specifiedMemberOnloopFilter = collectVar;
        return {
          name: member,
          userEmailDefault: userEmail,
          // topicsCovered : 
          overallAssignmentcalc: Number(
            ((reduced / (totalDaysTakenForTheBatch.length * 100)) * 100).toFixed(1)
          ),
          overallAttendance: `${count}/ ${totalDaysTakenForTheBatch.length} days`,
          overallAbsent: totalDaysTakenForTheBatch.length - count,
          fromTrainer: 100,
          history: specifiedMemberOnloopFilter.map((eachDataBymember) => {
            return {
              date: eachDataBymember["Date-Pick"],
              daywiseselfassessment: eachDataBymember.slider + "",
              topicsCovered : eachDataBymember.TopicsCovered
            };
          }),

          pictureSettings: userEmail,
          batchNo: batchNo,
        };
      });
      setTotalManipulatedData(calculateByStudent)
      let preparedDataSet = calculateByStudent;
      setTotalDaysForTheBatch(calculateTheDaysUNique.length);
      setchartLoadChecker(true);
      setDataForMembers(preparedDataSet);
      setchartLoadChecker(true);
      console.log(userArray);
    }
    getallData();
  }, []);

  return (
    <>
    {/* <p style={{display:"flex", fontSize:"large" , fontWeight:400}}>{`Users Filled Up Data`.toUpperCase()}</p> */}
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name Of The Candidate</TableCell>
            <TableCell align='center'>Batch No</TableCell>
            <TableCell align='center'>Overall Self Assessments (Average) <div style={{fontSize:"12px"}}>(Absent or unfilled days will affect the average)</div></TableCell>
            <TableCell align='center'>Overall Attendance<div style={{fontSize:"12px"}}>(Filled days / Total days)</div></TableCell>
            <TableCell align='center'>No Of days Absent or Unfilled</TableCell>
            {/* <TableCell align="right">Marks From The Trainer</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsState.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
        
      </Table>
      <Pagination 
      onChange={onShowSizeChange} defaultCurrent={1} total={totalManipulatedData.length+6} />
    </TableContainer>
    </>
  );
}

export default CollapsibleTable;
