import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Header from '../../components/Header/Header';

import "./Dashboard.css"
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/InputText/Input';

function Dashboard() {

  const [nurseList, setNurseList] = useState([
    {
      id: 1,
      fullName: "Nurse One",
      email: "nurseone@email.com"
    },
    {
      id: 2,
      fullName: "Nurse Two",
      email: "nursetwo@email.com"
    },
    {
      id: 3,
      fullName: "Nurse Three",
      email: "nursethree@email.com"
    }
  ])
  const [addNurseModalIsOpen, setaddNurseModalIsOpen] = useState(false)
  const [editNurseModalIsOpen, setEditNurseModalIsOpen] = useState(false)

  const [addNurseFullName, setAddNurseFullName] = useState("")
  const [addNurseEmail, setAddNurseEmail] = useState("")

  const [hasAddNurseFullNameError, setHasAddNurseFullNameError] = useState(false);
  const [hasAddNurseEmailError, setHasAddNurseEmailError] = useState(false);

  const [addNurseFullNameErrorMessage, setAddNurseFullNameErrorMessage] = useState("");
  const [addNurseEmailErrorMessage, setAddNurseEmailErrorMessage] = useState("");

  const [editNurseId, setEditNurseId] = useState(null)
  const [editNurseFullName, setEditNurseFullName] = useState("")
  const [editNurseEmail, setEditNurseEmail] = useState("")

  const requiredInputField = "This field is required"

  const getNurseList = async() => {
    await axios.get(`http://localhost:8081/nurse`)
    .then(function (response) {
      console.log(response.data, "response.data")
      setNurseList(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const handleAddNurseModalToggle = () => {
    setaddNurseModalIsOpen(!addNurseModalIsOpen)
  }

  const handleAddNurseFullNameChange = (event) => {
    setAddNurseFullName(event.target.value)
  }

  const handleAddNurseEmailChange = (event) => {
    setAddNurseEmail(event.target.value)
  }

  const handleAddNurse = () => {
    let currentNurseList = nurseList;
    let newNurse = {
      id: nurseList[nurseList.length - 1].id + 1,
      fullName: "",
      email: ""
    }
    const payload = {addNurseFullName, addNurseEmail}
    if (addNurseFullName.length === 0){
      setAddNurseFullNameErrorMessage(requiredInputField)
    }

    if (addNurseEmail.length === 0){
      setAddNurseEmailErrorMessage(requiredInputField)
    }
    console.log(payload)

    newNurse.fullName = addNurseFullName;
    newNurse.email = addNurseEmail;

    currentNurseList.push(newNurse);
    setNurseList(currentNurseList);
    handleAddNurseModalToggle();
    setAddNurseFullName("");
    setAddNurseEmail("");
  }

  const handleDeleteNurse = (id) => {
    let newNurseList = []
    nurseList.map((nurse) => {
      if(id !== nurse.id){
        newNurseList.push(nurse)
      }
    })
    setNurseList(newNurseList)
  }

  const handleEditNurse = (id) => {
    setEditNurseId(id)
    nurseList.map(nurse => {
      if(id === nurse.id){
        setEditNurseFullName(nurse.fullName)
        setEditNurseEmail(nurse.email)
      }
    })
    setEditNurseModalIsOpen(!editNurseModalIsOpen)
  }

  const handleEditNurseFullNameChange = (event) => {
    setEditNurseFullName(event.target.value)
  }

  const handleEditNurseEmailChange = (event) => {
    setEditNurseEmail(event.target.value)
  }

  const handleSaveEditNurse = () => {
    nurseList.map(nurse => {
      if(editNurseId === nurse.id){
        nurse.fullName = editNurseFullName;
        nurse.email = editNurseEmail
      }
    })
    setEditNurseModalIsOpen(!editNurseModalIsOpen)
  }

  useEffect(() => {
    getNurseList()
  }, [])
  

  return (
    <div className='Dashboard'>
      {console.log(nurseList, "length")}
      <Header />
      <div className="container">
        <div className='text-right'>
          <Button buttonText="Add Nurse" handleClick={handleAddNurseModalToggle} type="Primary" />
        </div>
        <div>
          {nurseList && nurseList.map((nurse, index) => (
            <div className='Nurse__list' key={index}>
              <div>
                <span>{nurse.id}</span>
              </div>
              <div>
                <span>{nurse.fullName}</span>
              </div>
              <div>
                <span>{nurse.email}</span>
              </div>
              <div>
                <Button buttonText="Edit" handleClick={() => handleEditNurse(nurse.id)} type="Primary" />
                <Button buttonText="Delete" handleClick={() => handleDeleteNurse(nurse.id)} type="Danger" />
              </div>
            </div>
          ))}
        </div>
        {addNurseModalIsOpen ? (
          <Modal handleModalToggle={handleAddNurseModalToggle}>
            <h3>Add nurse</h3>
            <div>
            <Input
              labelText="Full Name" 
              hasIcon={false} 
              placeholder="Enter nurse full name" 
              type="text" 
              value={addNurseFullName}
              handleChange={handleAddNurseFullNameChange}
              isInvalid={hasAddNurseFullNameError}
              errorMessage={addNurseFullNameErrorMessage}
            />
            <Input
              labelText="Email" 
              hasIcon={false} 
              placeholder="Enter nurse email" 
              type="email" 
              value={addNurseEmail}
              handleChange={handleAddNurseEmailChange}
              isInvalid={hasAddNurseEmailError}
              errorMessage={addNurseEmailErrorMessage}
            />
            <div className="text-center">
              <Button buttonText="Add" handleClick={handleAddNurse} type="Primary" />
            </div>
            </div>
          </Modal>
        ): null}

        {editNurseModalIsOpen ? (
          <Modal handleModalToggle={handleAddNurseModalToggle}>
            <h3>Edit nurse</h3>
            <div>
            <Input
              labelText="Full Name" 
              hasIcon={false} 
              placeholder="Enter nurse full name" 
              type="text" 
              value={editNurseFullName}
              handleChange={handleEditNurseFullNameChange}
              // isInvalid={hasAddNurseFullNameError}
              // errorMessage={addNurseFullNameErrorMessage}
            />
            <Input
              labelText="Email" 
              hasIcon={false} 
              placeholder="Enter nurse email" 
              type="email" 
              value={editNurseEmail}
              handleChange={handleEditNurseEmailChange}
              // isInvalid={hasAddNurseEmailError}
              // errorMessage={addNurseEmailErrorMessage}
            />
            <div className="text-center">
              <Button buttonText="Save" handleClick={handleSaveEditNurse} type="Primary" />
            </div>
            </div>
          </Modal>
        ): null}
      </div>
    </div>
  )
}

export default Dashboard