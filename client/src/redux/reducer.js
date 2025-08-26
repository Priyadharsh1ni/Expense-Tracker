const initialState = {
    expense: [],
    summary: {},
    expoenseList: []
}

 const reducer =(state =initialState, action )=>{
    switch (action.type){
        case "ADD":
            return{
                ...state,
                expense : action.data,
                summary : {...state.summary, ...action.data},
            }
        case 'SUMMARY':
            
            return{
                ...state,
                summary: action.payload
            }
        case 'EXPENCES':
            return{
                ...state,
                expoenseList: action.payload
            }
        case 'DELETE':
            return{
                ...state,
                expoenseList: state.expoenseList.filter(expense => expense._id !== action.payload)
            }
        case 'UPDATE':
            return{
                ...state,
                expoenseList: state.expoenseList.map(expense => expense._id === action.payload._id ? action.payload : expense)
            }   
        case 'CREATE':
            return{
                ...state,
                expoenseList: [...state.expoenseList, action.payload]
            }
        default:
            return state
    }

}


export default reducer
