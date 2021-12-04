
import { combineReducers } from "redux";
import tableReducer from "./tableData";
import userState from "./userProfileReducer"

const reducers = combineReducers({
    userDetails: userState,
    tableDataFromRedux : tableReducer
})

export default reducers
