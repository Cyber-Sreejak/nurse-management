import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Header from '../../components/Header/Header';

import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/InputText/Input';

import "./Dashboard.css"

function Dashboard() {

  const [nurseList, setNurseList] = useState([])
  const [addNurseModalIsOpen, setaddNurseModalIsOpen] = useState(false)
  const [editNurseModalIsOpen, setEditNurseModalIsOpen] = useState(false)

  //add nurse handlers
  const [addNurseFullName, setAddNurseFullName] = useState("")
  const [addNurseEmail, setAddNurseEmail] = useState("")
  const [addNurseContact, setAddNurseContact] = useState("")
  const [addNurseWorkingDays, setAddNurseWorkingDays] = useState("")
  const [addNurseDutyStartTime, setAddNurseDutyStartTime] = useState("")
  const [addNurseDutyEndTime, setAddNurseDutyEndTime] = useState("")

  const handleAddNurseFullNameChange = (event) => {
    setAddNurseFullName(event.target.value)
  }

  const handleAddNurseEmailChange = (event) => {
    setAddNurseEmail(event.target.value)
  }

  const handleAddNurseContactChange = (event) => {
    setAddNurseContact(event.target.value)
  }

  const handleAddNurseWorkingDaysChange = (event) => {
    setAddNurseWorkingDays(event.target.value)
  }

  const handleAddNurseDutyStartTimeChange = (event) => {
    setAddNurseDutyStartTime(event.target.value)
  }

  const handleAddNurseDutyEndTimeChange = (event) => {
    setAddNurseDutyEndTime(event.target.value)
  }

  const handleAddNurse = async() => {
    let payload = {
        fullName: addNurseFullName,
        email: addNurseEmail,
        contact: addNurseContact,
        workingDays: addNurseWorkingDays,
        dutyStartTime: addNurseDutyStartTime,
        dutyEndTime: addNurseDutyEndTime
    }
    await axios.post(`http://localhost:8000/nurse/create`, payload)
    .then(function (response) {
      console.log(response.data, "response.data")
      getNurseList()
      setaddNurseModalIsOpen(false)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const requiredInputField = "This field is required"

  const getNurseList = async() => {
    await axios.get(`http://localhost:8000/nurse/get`)
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

  //edit nurse handlers
  const [editNurseId, setEditNurseId] = useState(null)
  const [editNurseFullName, setEditNurseFullName] = useState("")
  const [editNurseEmail, setEditNurseEmail] = useState("")
  const [editNurseContact, setEditNurseContact] = useState("")
  const [editNurseWorkingDays, setEditNurseWorkingDays] = useState("")
  const [editNurseDutyStartTime, setEditNurseDutyStartTime] = useState("")
  const [editNurseDutyEndTime, setEditNurseDutyEndTime] = useState("")

  const handleEditNurseFullNameChange = (event) => {
    setEditNurseFullName(event.target.value)
  }

  const handleEditNurseEmailChange = (event) => {
    setEditNurseEmail(event.target.value)
  }

  const handleEditNurseContactChange = (event) => {
    setEditNurseContact(event.target.value)
  }

  const handleEditNurseWorkingDaysChange = (event) => {
    setEditNurseWorkingDays(event.target.value)
  }

  const handleEditNurseDutyStartTimeChange = (event) => {
    setEditNurseDutyStartTime(event.target.value)
  }

  const handleEditNurseDutyEndTimeChange = (event) => {
    setEditNurseDutyEndTime(event.target.value)
  }

  const handleEditNurseModalToggle = () => {
    setEditNurseModalIsOpen(!editNurseModalIsOpen)
  }


  //edit nurse handlers
  const [deleteNurseId, setDeleteNurseId] = useState("")
  const [deleteNurseModalOpen, setDeleteNurseModalOpen] = useState(false)

  const handleDeleteNurse = (id) => {
    setDeleteNurseModalOpen(true)
    setDeleteNurseId(id)
    console.log(id)
  }

  const handleDeleteNurseConfirm = async(id) => {
    await axios.delete(`http://localhost:8000/nurse/delete/${id}`)
    .then(function (response) {
      console.log(response.data)
      getNurseList()
      setDeleteNurseModalOpen(false)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const handleEditNurse = (id) => {
    setEditNurseId(id)
    nurseList.map(nurse => {
      if(id === nurse._id){
        setEditNurseFullName(nurse.fullName)
        setEditNurseEmail(nurse.email)
        setEditNurseContact(nurse.contact)
        setEditNurseWorkingDays(nurse.workingDays)
        setEditNurseDutyStartTime(nurse.dutyStartTime)
        setEditNurseDutyEndTime(nurse.dutyEndTime)
      }
    })
    setEditNurseModalIsOpen(!editNurseModalIsOpen)
  }

  const handleSaveEditNurse = async() => {
    let payload = {
      fullName: editNurseFullName,
      email: editNurseEmail,
      contact: editNurseContact,
      workingDays: editNurseWorkingDays,
      dutyStartTime: editNurseDutyStartTime,
      dutyEndTime: editNurseDutyEndTime
    }
    await axios.post(`http://localhost:8000/nurse/update/${editNurseId}`, payload)
    .then(function (response) {
      console.log(response.data)
      getNurseList()
      setEditNurseModalIsOpen(!editNurseModalIsOpen)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  useEffect(() => {
    getNurseList()
  }, [])
  

  return (
    <div className='Dashboard'>
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
                <Button buttonText="Edit" handleClick={() => handleEditNurse(nurse._id)} type="Primary" />
                <Button buttonText="Delete" handleClick={() => handleDeleteNurse(nurse._id)} type="Danger" />
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
            />
            <Input
              labelText="Email" 
              hasIcon={false} 
              placeholder="Enter nurse email" 
              type="email" 
              value={addNurseEmail}
              handleChange={handleAddNurseEmailChange}
            />
            <Input
              labelText="Contact" 
              hasIcon={false} 
              placeholder="Enter nurse contact number" 
              type="text" 
              value={addNurseContact}
              handleChange={handleAddNurseContactChange}
            />
            <Input
              labelText="Working Days" 
              hasIcon={false} 
              placeholder="Enter working days" 
              type="test" 
              value={addNurseWorkingDays}
              handleChange={handleAddNurseWorkingDaysChange}
            />
            <Input
              labelText="Duty start time" 
              hasIcon={false} 
              placeholder="Enter dyty start time" 
              type="text" 
              value={addNurseDutyStartTime}
              handleChange={handleAddNurseDutyStartTimeChange}
            />
            <Input
              labelText="Duty end time" 
              hasIcon={false} 
              placeholder="Enter dyty end time" 
              type="email" 
              value={addNurseDutyEndTime}
              handleChange={handleAddNurseDutyEndTimeChange}
            />
            <div className="text-center">
              <Button buttonText="Add" handleClick={handleAddNurse} type="Primary" />
            </div>
            </div>
          </Modal>
        ): null}

        {editNurseModalIsOpen ? (
          <Modal handleModalToggle={handleEditNurseModalToggle}>
            <h3>Edit nurse</h3>
            <div>
            <Input
              labelText="Full Name" 
              hasIcon={false} 
              placeholder="Enter nurse full name" 
              type="text" 
              value={editNurseFullName}
              handleChange={handleEditNurseFullNameChange}
            />
            <Input
              labelText="Email" 
              hasIcon={false} 
              placeholder="Enter nurse email" 
              type="email" 
              value={editNurseEmail}
              handleChange={handleEditNurseEmailChange}
            />
            <Input
              labelText="Contact" 
              hasIcon={false} 
              placeholder="Enter nurse contact number" 
              type="text" 
              value={editNurseContact}
              handleChange={handleEditNurseContactChange}
            />
            <Input
              labelText="Working Days" 
              hasIcon={false} 
              placeholder="Enter working days" 
              type="test" 
              value={editNurseWorkingDays}
              handleChange={handleEditNurseWorkingDaysChange}
            />
            <Input
              labelText="Duty start time" 
              hasIcon={false} 
              placeholder="Enter dyty start time" 
              type="text" 
              value={editNurseDutyStartTime}
              handleChange={handleEditNurseDutyStartTimeChange}
            />
            <Input
              labelText="Duty end time" 
              hasIcon={false} 
              placeholder="Enter dyty end time" 
              type="email" 
              value={editNurseDutyEndTime}
              handleChange={handleEditNurseDutyEndTimeChange}
            />
            <div className="text-center">
              <Button buttonText="Save" handleClick={handleSaveEditNurse} type="Primary" />
            </div>
            </div>
          </Modal>
        ): null}
        {deleteNurseModalOpen ? (
          <Modal handleModalToggle={handleEditNurseModalToggle}>
            <div className='text-center'>
              <p>Are you sure you want to<br /> delete the nurse?</p>
            </div>
            <div>
                <Button buttonText="Cancel" handleClick={() => setDeleteNurseModalOpen(false)} type="Primary" />
                <Button buttonText="Delete" handleClick={() => handleDeleteNurseConfirm(deleteNurseId)} type="Danger" />
            </div>
          </Modal>
        ):null}
      </div>
    </div>
  )
}

export default Dashboard