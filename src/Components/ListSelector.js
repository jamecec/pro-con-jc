import React, {useState, useEffect, useRef} from 'react';
import Argument from './Argument.js';
import Modal from './Modal.js';

export default function ListSelector(){
  const [isOpen, setIsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState();
  const [listName, setListName] = useState();
  const [formStatus, setFormStatus] = useState();
  const [listArr, setListArr] = useState(localStorage.getItem("lists") == null ? [] : JSON.parse(localStorage.getItem("lists")));
  const closeModal = () =>{
    setFormStatus();
    setIsOpen(false);
  }
  const newList = (e) => {
    if(document.querySelector("#listName").value.length == 0){
      setFormStatus("All Fields Required")
    }
    else{
    let prevLists = localStorage.getItem("lists") == null ? [] : JSON.parse(localStorage.getItem("lists"));
    prevLists.push(listName);
    localStorage.setItem("lists", JSON.stringify(prevLists));
    setListArr(prevLists);
    setSelectedList(listName);
    closeModal();
    }
  }

  return(
    <div>
    <div className="selections">
    <h1>Pros & Cons</h1>
    <div className="listSelection">
    <button onClick={()=>setIsOpen(true)}>Create List</button>
    <Modal open={isOpen} onClose={closeModal} onSubmit={newList}>
    <div className="listModal">
    <p>Name Your List:</p>
    <input type="text" name="listName" id="listName" onChange={(e)=>setListName(e.target.value)}/>
    {formStatus}
    </div>
    </Modal>
    <p>Select List:</p>
    <select defaultValue = "" name = "list" onChange = {(e)=>setSelectedList(e.target.value)}>
    <option value = "" disabled hidden>Please Select List</option>
    {listArr.map((list) => <option key={list} value = {list}>{list}</option>)}
    </select>
    </div>
    </div>
    <Argument
    selectedList={selectedList}
    formStatus={formStatus}
    setFormStatus={setFormStatus}
    />
    </div>
  )
}
