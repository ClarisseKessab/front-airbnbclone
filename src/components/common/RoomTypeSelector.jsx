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
        className="form-select"
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
