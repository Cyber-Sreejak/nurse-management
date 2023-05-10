import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/InputText/Input';

import "./Dashboard.css"

function Dashboard() {
  const navigate = useNavigate();
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
  const [addNurseIsRoundingManager, setAddNurseIsRoundingManager] = useState("")

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

  const handleAddNurseRoundingManager = (event) => {
    setAddNurseIsRoundingManager(event.target.value);
  }

  const handleAddNurse = async() => {
    let payload = {
        fullName: addNurseFullName,
        email: addNurseEmail,
        contact: addNurseContact,
        workingDays: addNurseWorkingDays,
        dutyStartTime: addNurseDutyStartTime,
        dutyEndTime: addNurseDutyEndTime,
        isRoundingManager: addNurseIsRoundingManager,
    }
    await axios.post(`http://localhost:8000/nurse/create`, payload)
    .then(function (response) {
      console.log(response.data, "response.data")
      getNurseList()
      setaddNurseModalIsOpen(false)
      setAddNurseFullName("")
      setAddNurseEmail("")
      setAddNurseContact("")
      setAddNurseWorkingDays("")
      setAddNurseDutyStartTime("")
      setAddNurseDutyEndTime("")
      setAddNurseIsRoundingManager("")
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
  const [editNurseIsRoundingManager, setEditNurseIsRoundingManager] = useState("")

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

  const handleEditNurseRoundingManager = (event) => {
    setEditNurseIsRoundingManager(event.target.value);
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
        setEditNurseIsRoundingManager(nurse.isRoundingManager)
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
      dutyEndTime: editNurseDutyEndTime,
      isRoundingManager: editNurseIsRoundingManager,
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
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login")
    }
    getNurseList();
  }, [])  

  return (
    <div className='Dashboard'>
      <Header />
      <div className="container">
        <div className='text-right'>
          <Button buttonText="Add Nurse" handleClick={handleAddNurseModalToggle} type="Primary" />
        </div>
        {nurseList.length > 0 ? (
          <table style={{width: "100%"}}>
            <thead>
              <tr className='Nurse__list'>
                <th className='text-left' style={{width: "180px"}}>Name</th>
                <th className='text-left'>Email</th>
                <th className='text-left'>Status</th>
                <th className='text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {nurseList && nurseList.map((nurse, index) => (
                <tr className='Nurse__list' key={index}>
                  <td style={{width: "180px"}}>
                    <span>{nurse.fullName}</span>
                  </td>
                  <td>
                    <span>{nurse.email}</span>
                  </td>
                  <td>
                    <span>{nurse.isRoundingManager}</span>
                  </td>
                  <td>
                    <Button buttonText="Edit" handleClick={() => handleEditNurse(nurse._id)} type="Primary" />
                    <Button buttonText="Delete" handleClick={() => handleDeleteNurse(nurse._id)} type="Danger" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ): (
          <div>
            <p>The list of your nurse is empty.</p>
          </div>
        )}
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
            <div>
              <p>Is nurse rounding manager?</p>
              <div>
                <input id="isRoundingManager" checked={addNurseIsRoundingManager === "isRoundingManager"} onChange={handleAddNurseRoundingManager} value="isRoundingManager" type="radio" />
                <label htmlFor="isRoundingManager">Yes</label>
              </div>
              <div>
                <input id="isNotRoundingManager" checked={addNurseIsRoundingManager === "isNotRoundingManager"} onChange={handleAddNurseRoundingManager} value="isNotRoundingManager" type="radio" />
                <label htmlFor="isNotRoundingManager">No</label>
              </div>
            </div>
            <div className="text-center">
              <Button buttonText="Cancel" handleClick={handleAddNurseModalToggle} type="Primary" />
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
            <div>
              <p>Is nurse rounding manager?</p>
              <div>
                <input id="isRoundingManager" checked={editNurseIsRoundingManager === "isRoundingManager"} onChange={handleEditNurseRoundingManager} value="isRoundingManager" type="radio" />
                <label htmlFor="isRoundingManager">Yes</label>
              </div>
              <div>
                <input id="isNotRoundingManager" checked={editNurseIsRoundingManager === "isNotRoundingManager"} onChange={handleEditNurseRoundingManager} value="isNotRoundingManager" type="radio" />
                <label htmlFor="isNotRoundingManager">No</label>
              </div>
            </div>
            <div className="text-center">
              <Button buttonText="Cancel" handleClick={handleEditNurseModalToggle} type="Primary" />
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
            <div className='text-center'>
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