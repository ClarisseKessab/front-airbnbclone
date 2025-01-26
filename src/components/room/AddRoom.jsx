/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { addRoom } from "../utils/ApiFunctions"
import RoomTypeSelector from '../common/RoomTypeSelector';


const AddRoom = () => {
  const[newRoom, setNewRoom] = useState({
    photo : null,
    roomType : "",
    roomPrice : ""
  })

  const[imagePreview, setImagePreview] = useState("");
  const[successMessage, setSuccessMessage] = useState("");
  const[errorMessage, setErrorMessage] = useState("");

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target
    setNewRoom(prevState => ({
      ...prevState,
      [name]: value
    }))
  }


  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({...newRoom,photo: selectedImage})
    setImagePreview(URL.createObjectURL(selectedImage))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
      if(success != undefined ){
        setSuccessMessage("A new room was added to the database");
        setNewRoom({photo:null, roomType:" ", roomPrice: " "});
        setImagePreview(" ")
        setErrorMessage(" ")
      } else {
        setErrorMessage("Error adding Room")
      }
    }catch(error){
      setErrorMessage(error.message)
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("")
    }, 3000);
  }

  return (
    <section>
    <div className = "m-10 flex justify-center">
      <div>
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-5">Add a New Room</h2>
        {successMessage ? (
          <div>
            {successMessage}
          </div>
        ) : errorMessage ? (
          <div>
            {errorMessage}
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="roomType" className="block text-2xl font-medium text-gray-900">Room Type</label>
            <div>
              <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom}/>
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="roomPrice" className="block text-2xl font-medium text-gray-900">Room Price</label>
            <input
              required
              id="roomPrice"
              name="roomPrice"
              type="number"
              value={newRoom.roomPrice}
              onChange={handleRoomInputChange}
              className = "w-full block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="photo" className="block text-2xl font-medium text-gray-900">Room Photo</label>
            <input
              id="photo"
              name="photo"
              type="file"
              onChange={handleImageChange}
              className= "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-gray-700 border border-gray-200 rounded-md shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-100"/>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview Room Photo"
              />
            )}
          </div>
          <div className="mb-7">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
              Save Room
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>

  )
}

export default AddRoom;
