import { useReducer} from 'react'
import DigitButton from "./DigitalButton"
import OperationButton from "./operationbutton"
import './App.css'
import {ACTIONS} from './actions'
function reducer(state,{type,payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          curOperand:payload.digit,
          overwrite:false,
        }
      }
      if(payload.digit==="0" && state.curOperand==="0") return state
      if(payload.digit==="."&& state.curOperand.includes(".")) {return state}
      return{
        ...state,
        curOperand:`${state.curOperand|| ""}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.curOperand==null && state.preOperand==null){
        return state
      }
      if (state.curOperand==null){
        return{
          ...state,
          operation:payload.operation,
        }
      }
      if(state.preOperand==null){
        return{
          ...state,
          operation:payload.operation,
          preOperand:state.curOperand,
          curOperand:null,
        }
      }
      return{
        ...state,preOperand:evaluate(state),
        operation:payload.operation,
        curOperand:null}
      
    case ACTIONS.CLEAR:
      return{}
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          overwrite:false,
          curOperand:null}
        }
      if(state.curOperand==null)return state
      if(state.curOperand.length===1){
        return{...state,curOperand:null}
      }
      return{
         ...state,
         curOperand:state.curOperand.slice(0,-1)
      }

      
      

    case ACTIONS.EVALUATE:
       if(
        state.operation==null||
        state.curOperand==null||
        state.preOperand==null
       ){
        return state
       }
       return {
        ...state,
        overwrite:true,
        preOperand:null,
        operation:null,
        curOperand:evaluate(state),

       }

}}
function evaluate({curOperand,preOperand,operation}){
  const prev=parseFloat(preOperand)
  const current=parseFloat(curOperand)
  if(isNaN(prev) || isNaN(current)) return ""
  let computation =""
  switch(operation){
    case "+":
    computation=prev+current;
    break
    case "-":
      computation=prev-current;
     break
    case "*":
      computation=prev*current;
      break
    case "/":
      computation=prev/current;
      break
     default:
      return ""
  }
   return computation.toString()
}
function App() {
  const [{curOperand,preOperand,operation},dispatch]=useReducer(reducer,{})
  
  return (
      <div className="main">
      <div className="calculator-grid">
      <div className="output">
        <div className="pre-op">{preOperand} {operation}</div>
        <div className="cur-op">{curOperand}</div>
      </div>
      <button className="span-two" onClick={()=>dispatch({
        type:ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=>dispatch({
        type:ACTIONS.DELETE_DIGIT})}>DEL </button>
      
      <OperationButton operation="/" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperationButton operation="*" dispatch={dispatch}/>
     <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperationButton operation="+" dispatch={dispatch}/>
     <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationButton operation="-" dispatch={dispatch}/>
     <DigitButton digit="0" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}/> 
      <button className="span-two"onClick={()=>dispatch({
        type:ACTIONS.EVALUATE})}>=</button>
      </div></div>
   
  )
}

export default App
