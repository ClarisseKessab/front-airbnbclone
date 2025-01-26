/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { getRoomTypes } from "../utils/ApiFunctions"

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([])
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
  const [newRoomType, setNewRoomType] = useState("")

  useEffect(() => {
    getRoomTypes()
      .then((data) => {
        setRoomTypes(data)
      })
      .catch((error) => {
        console.error("Failed to fetch room types:", error)
      })
  }, [])

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value)
  }

  const handleAddNewRoomType = () => {
    if (newRoomType.trim() !== "") {
      const updatedRoomTypes = [...roomTypes, newRoomType.trim()]
      setRoomTypes(updatedRoomTypes)
      handleRoomInputChange({ target: { name: "roomType", value: newRoomType.trim() } })
      setNewRoomType("")
      setShowNewRoomTypeInput(false)
    }
  }

  const handleSelectChange = (e) => {
    if (e.target.value === "Add New") {
      setShowNewRoomTypeInput(true)
    } else {
      handleRoomInputChange(e)
    }
  }

  return (
    <div>
      <select
        name="roomType"
        id="roomType"
        value={newRoom.roomType}
        onChange={handleSelectChange}
        className="w-full block px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select a Room Type</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
        <option value="Add New">Add New</option>
      </select>

      {showNewRoomTypeInput && (
        <div className="input-group mt-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a new room type"
            value={newRoomType}
            onChange={handleNewRoomTypeInputChange}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAddNewRoomType}
          >
            Add
          </button>
        </div>
      )}
    </div>
  )
}

export default RoomTypeSelector
