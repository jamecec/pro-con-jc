import React, {useState, useEffect, useRef} from 'react';
import Modal from './Modal.js';
import List from './List.js';

export default function Argument(props){
  const [isOpen, setIsOpen] = useState(false);
  const [side, setSide] = useState();
  const [description, setDescription] = useState();
  const [importance, setImportance] = useState();
  const [clicked, setClicked] = useState(false);
  const [argumentStatus, setArgumentStatus] = useState();
  const closeModal = () => {
    props.setFormStatus();
    setIsOpen(false);
    setClicked(false);
  }
  const openArgument = () => {
    if(!props.selectedList){
      setArgumentStatus("Please Select or Create List");
    }
      else{
        setIsOpen(true);
        setArgumentStatus();
      }
  }
  const createArgument = () => {
    let prevPros = localStorage.getItem(props.selectedList) == null ? [] : JSON.parse(localStorage.getItem(props.selectedList)).pros;
    let prevCons = localStorage.getItem(props.selectedList) == null ? [] : JSON.parse(localStorage.getItem(props.selectedList)).cons;
    if(side == "pro"){
      prevPros.push({argument : description, importance: importance, side: side});
    }
    else{
      prevCons.push({argument : description, importance: importance, side: side});
    }
    const listObj = {"listName" : props.selectedList, "pros" : prevPros, "cons" : prevCons};
    localStorage.setItem(props.selectedList, JSON.stringify(listObj));
  }
  const argumentSubmit = (e) => {
    e.preventDefault();
    if(document.querySelector("#side").value == "" || document.querySelector("#description").value.length == 0 || !clicked){
      props.setFormStatus("All Fields Required");
    }
    else{
    createArgument();
    closeModal();
    }
  }
  const importanceClick = (e) => {
    setImportance(e.target.value);
    setClicked(true);
    document.querySelectorAll('.weightBtn').forEach((btn)=>{
      btn.style.backgroundColor = 'white';
    })
    e.target.style.backgroundColor = "#c8d6d5";
  }
  return(
    <div>
    <h2>{props.selectedList}</h2>
    <div className = "arguments">
    <button onClick={()=>openArgument()}>Add an Argument</button>
    {argumentStatus}
    <Modal open={isOpen} onClose={closeModal} onSubmit={argumentSubmit}>
    <h3>Argument</h3>
    <div className="side">
    <p>Side:</p>
    <select defaultValue = "" name = "side" id="side" onChange = {(e)=>setSide(e.target.value)}>
    <option value = "" disabled hidden>Please Select List</option>
    <option value = "pro" >Pro</option>
    <option value = "con" >Con</option>
    </select>
    </div>
    <p>Description:</p>
    <textarea type="text" name="description" id = "description" onChange={(e)=>setDescription(e.target.value)}/>

    <p>Importance (5 = More Important):</p>
    <div className="importance">
    <button className="weightBtn" value = {1} onClick={importanceClick}>1</button>
    <button className="weightBtn" value = {2} onClick={importanceClick}>2</button>
    <button className="weightBtn" value = {3} onClick={importanceClick}>3</button>
    <button className="weightBtn" value = {4} onClick={importanceClick}>4</button>
    <button className="weightBtn" value = {5} onClick={importanceClick}>5</button>
    </div>
    {props.formStatus}
    </Modal>
    </div>
    <List
    selectedList={props.selectedList}
    close={props.close}
    importanceClick={importanceClick}
    clicked={clicked}
    setClicked={setClicked}
    createArgument={createArgument}
    side={side}
    setSide={setSide}
    description={description}
    setDescription={setDescription}
    importance={importance}
    setImportance={setImportance}
    formStatus={props.formStatus}
    setFormStatus={props.setFormStatus}
    />
    </div>
  )
}
