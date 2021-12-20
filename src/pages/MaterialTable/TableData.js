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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell align='center'>{row.overallAssignmentcalc}</TableCell>
        {/* <TableCell align="right">{row.fat}</TableCell> */}
        <TableCell align='center'>{row.overallAttendance}</TableCell>
        <TableCell align='center'>{row.overallAbsent}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                History
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Date</TableCell>
                    <TableCell align='center'>
                      Day wise Self Assessment
                    </TableCell>
                    <TableCell align='center'>Amount</TableCell>
                    <TableCell align='center'>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row' align='center'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell align='center'>
                        {historyRow.daywiseselfassessment}
                      </TableCell>
                      <TableCell align='center'>{historyRow.amount}</TableCell>
                      <TableCell align='center'>
                        {Math.round(historyRow.amount * row.fromTrainer * 100) /
                          100}
                      </TableCell>
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

// Row.propTypes = {
//   row: PropTypes.shape({
//     overallAssignmentcalc: PropTypes.number.isRequired,
//     overallAttendance: PropTypes.number.isRequired,
//     // fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         daywiseselfassessment: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     fromTrainer: PropTypes.number.isRequired,
//     overallAbsent: PropTypes.number.isRequired,
//   }).isRequired,
// };

const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99, "")];

function CollapsibleTable({ batchNoFromTab }) {
  const [batchNoOnClickFromTab, setbatchNoOnClickFromTab] = useState(
    batchNoFromTab || 5
  );
  const [rowsState, setRowsState] = useState(rows);
  const [dataForMembers, setDataForMembers] = useState(data);
  const [chartLoadChecker, setchartLoadChecker] = useState(false);
  const [TotalDaysForTheBatch, setTotalDaysForTheBatch] = useState(0);
  useEffect(() => {
    async function getallData() {
      const querySnapshot = await getDocs(collection(db, "studentTaskDetails"));
      let userArray = [];
      querySnapshot.forEach((doc) => {
        userArray.push(doc.data());
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
          overallAssignmentcalc: Number(
            ((reduced / (calculateTheDaysUNique.length * 100)) * 100).toFixed(1)
          ),
          overallAttendance: `${count}`,
          overallAbsent: calculateTheDaysUNique.length - count,
          fromTrainer: 100,
          history: specifiedMemberOnloopFilter.map((eachDataBymember) => {
            return {
              date: eachDataBymember["Date-Pick"],
              daywiseselfassessment: eachDataBymember.slider + "",
              amount: 3,
            };
          }),

          pictureSettings: userEmail,
          batchNo: batchNo,
        };
      });
      setRowsState(calculateByStudent);

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
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name Of The Candidate</TableCell>
            <TableCell align='center'>Batch No</TableCell>
            <TableCell align='center'>Overall Self Assessments</TableCell>
            <TableCell align='center'>Overall Attendance</TableCell>
            <TableCell align='center'>No Of days Absent</TableCell>
            {/* <TableCell align="right">Marks From The Trainer</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsState.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;
