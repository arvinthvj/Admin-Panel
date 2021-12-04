export const userForProfileUI = (user) => {
    console.log(user, "Lol")
    return (dispatch) => {
        dispatch({
            type: "user",
            payload: user
        });
    }
}


export const tableDataForPageAction = (tableData) => {
    debugger
    return (dispatch) => {
        dispatch({
            type: "changeData",
            payload: tableData
        });
    }
}