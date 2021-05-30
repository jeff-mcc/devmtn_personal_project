const initialState = {
    projectInfo: null,
    dataInfo: null,
    finishedBool: false
}

const SET_PROJECT = "SET_PROJECT"
const SET_DATA = "SET_DATA"
const SET_FINISHED = "SET_FINISHED"

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

export function setFinished(finishedBool){
    return {
        type: SET_FINISHED,
        payload: finishedBool
    }
}

export default function projectReducer(state=initialState,action){
    switch(action.type){
        case SET_PROJECT:
            return {...state,projectInfo: action.payload}
        case SET_DATA:
            return {...state,dataInfo: action.payload}
        case SET_FINISHED:
            return {...state,finishedBool: action.payload}
        default:
            return {...state}
    }
}