export const userForProfileUI = (user) => {
    console.log(user, "Lol")
    return (dispatch) => {
        dispatch({
            type: "user",
            payload: user
        });
    }
}


export const tableDataForPageAction = (user) => {
    console.log(user, "Lol")
    return (dispatch) => {
        dispatch({
            type: "user",
            payload: user
        });
    }
}