import React, {useState, useEffect, useRef} from 'react';
import Modal from './Modal.js';

export default function List(props){
  const pros = localStorage.getItem(props.selectedList) == null? [] : JSON.parse(localStorage.getItem(props.selectedList)).pros;
  const cons = localStorage.getItem(props.selectedList) == null? [] : JSON.parse(localStorage.getItem(props.selectedList)).cons;
  const proScore = pros.length == 0 ? 0 : pros.map((item)=>Number(item.importance)).reduce((a,b)=> a + b);
  const conScore = cons.length == 0 ? 0 : cons.map((item)=>Number(item.importance)).reduce((a,b)=> a + b);
  const winner = proScore > conScore ? "Pros" : conScore > proScore ? "Cons" : "Tie";
  const [isOpen, setIsOpen] = useState(false);
  const [editArg, setEditArg] = useState();
  const [prevSide, setPrevSide] = useState();
  const closeModal = () =>{
    props.setFormStatus();
    setIsOpen(false);
    props.setClicked(false);
  }
  const edit = (argument, prevSide) => {
    setEditArg(argument);
    setPrevSide(prevSide);
    setIsOpen(true);
  }
  const deleteItem = () => {
    let prevPros = localStorage.getItem(props.selectedList) == null ? [] : JSON.parse(localStorage.getItem(props.selectedList)).pros;
    let prevCons = localStorage.getItem(props.selectedList) == null ? [] : JSON.parse(localStorage.getItem(props.selectedList)).cons;
    let prosFind = prevPros.map((item)=>item.argument);
    let consFind = prevCons.map((item)=>item.argument);
    if(prevSide=="pro"){
    prevPros.splice(prosFind.indexOf(editArg),1);
    const listObj = {"listName" : props.selectedList, "pros" : prevPros, "cons" : prevCons};
    localStorage.setItem(props.selectedList, JSON.stringify(listObj));
    closeModal();
    }
    else{
      prevCons.splice(consFind.indexOf(editArg),1);
      const listObj = {"listName" : props.selectedList, "pros" : prevPros, "cons" : prevCons};
      localStorage.setItem(props.selectedList, JSON.stringify(listObj));
      closeModal();
    }
  }
  const submitNewArgument = (e) => {
    e.preventDefault();
    if(document.querySelector("#side").value == "" || document.querySelector("#description").value.length == 0 || !props.clicked){
      props.setFormStatus("All Fields Required");
    }
    else{
      props.createArgument();
      deleteItem();
    }
  }

  return(
    <div>
    <div className = "listDisplay">
    <div className = "columns">
    <div className = "list">
    <h2>Pros</h2>
    <ul>
    {pros.sort((a,b)=> b.importance - a.importance)
         .map((item) => <li key={item.argument} onClick={(e)=>edit(item.argument,item.side)}>{item.argument} ({item.importance}) <i className="fa-solid fa-pen"></i></li>)}
    </ul>
    <p className = "score">Score: {proScore}</p>
    </div>
    <div className = "list">
    <h2>Cons</h2>
    <ul>
    {cons.sort((a,b)=> b.importance - a.importance)
         .map((item) => <li key={item.argument} onClick={(e)=>edit(item.argument, item.side)}>{item.argument} ({item.importance}) <i className="fa-solid fa-pen"></i></li>)}
    </ul>
    <p className = "score">Score: {conScore}</p>
    </div>
    <Modal open={isOpen} onClose={closeModal} onSubmit={submitNewArgument} deleteItem={deleteItem}>
    <h3>Argument</h3>
    <div className="side">
    <p>Side:</p>
    <select defaultValue = "" name = "side" id="side" onChange = {(e)=>props.setSide(e.target.value)}>
    <option value = "" disabled hidden>Please Select List</option>
    <option value = "pro" >Pro</option>
    <option value = "con" >Con</option>
    </select>
    </div>
    <p>Description:</p>
    <textarea type="text" name="description" id = "description" Change={(e)=>props.setDescription(e.target.value)}/>
    <p>Importance (5 = More Important):</p>
    <div className="importance">
    <button className="weightBtn" value = {1} onClick={props.importanceClick}>1</button>
    <button className="weightBtn" value = {2} onClick={props.importanceClick}>2</button>
    <button className="weightBtn" value = {3} onClick={props.importanceClick}>3</button>
    <button className="weightBtn" value = {4} onClick={props.importanceClick}>4</button>
    <button className="weightBtn" value = {5} onClick={props.importanceClick}>5</button>
    </div>
    {props.formStatus}
    </Modal>
    </div>
    <p className = "winner">Winner: {winner}</p>
    </div>
    </div>

  )
}
