const initialState = {
    projectInfo: null,
    dataInfo: null
}

const SET_PROJECT = "SET_PROJECT"
const SET_DATA = "SET_DATA"

export function setProjectInfo(projectInfo){
    return {
        type: SET_PROJECT,
        payload: projectInfo
    }
}

export function setDataInfo(dataInfo){
    return {
        type: SET_DATA,
        payload: dataInfo
    }
}

export default function projectReducer(state=initialState,action){
    switch(action.type){
        case SET_PROJECT:
            return {...state,projectInfo: action.payload}
        case SET_DATA:
            return {...state,dataInfo: action.payload}
        default:
            return {...state}
    }
}