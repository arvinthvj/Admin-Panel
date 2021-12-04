
import { combineReducers } from "redux";
import tableReducer from "./tableData";
import tableDataSourceReducer from "./tableSource";
import userState from "./userProfileReducer"

const reducers = combineReducers({
    userDetails: userState,
    tableDataFromRedux : tableReducer,
    tableDataSource  : tableDataSourceReducer 
})

export default reducers
