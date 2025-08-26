import { service } from "./service"
const login = (userDetails) => {
    return(dispatch) => {
        service.login(userDetails).then((res) => {
            dispatch({
                type: 'LOGIN',
                payload: res
            })
        })
    }
    
}


const fetchSummary = () =>{
    return(dispatch) => {
        service.fetchSummary().then((res) => {
            dispatch({
                type: 'SUMMARY',
                payload: res
            })
        })
    }
}

const createExpense = (data) =>{
    return(dispatch)=>{
        service.createExpense(data).then((res) =>{
            dispatch({
                type: 'EXPENCES',
                payload: res
            })
        })
    }
}

const fetchExpenses = () => {
    return(dispatch) => {
        service.fetchExpenses().then((res) => {
            dispatch({
                type: 'EXPENCES',
                payload: res
            })
        })
    }
}

const updateExpense = (id, expenseData) =>{
    return(dispatch) =>{
        service.updateExpense(id, expenseData).then((res) => {
            dispatch({
                type: 'UPDATE',
                payload: res
            })
        })
    }
}

const deleteExpense = (id) =>{
    return(dispatch) => {
        service.deleteExpense(id).then((res) => {
            dispatch({
                type: 'DELETE',
                payload: res
            })
        })
    }
}
export const action = {
    login,
    fetchSummary,
    createExpense,
    fetchExpenses,
    updateExpense,
    deleteExpense
}