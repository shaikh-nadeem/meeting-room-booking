import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookMeeting() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [duration, setDuration] = useState(30);
  const [members, setMembers] = useState(1);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [roomError, setRoomError] = useState('');


  const token = localStorage.getItem('token');

  const fetchRooms = async () => {
    try {
      const res = await api.post('/available-rooms', {
        start_time: startTime,
        duration,
        members,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRooms(res.data);
      setRoomError(''); // Clear any previous errors
    } catch (error) {
      console.error('Fetch rooms error:', error);

      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        const messages = Object.values(errors).flat().join('\n');
        setRoomError(messages);
      } else {
        setRoomError('Something went wrong while fetching rooms.');
      }

      setRooms([]);
    }
  };
  const submitBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/meetings', {
        name,
        start_time: startTime,
        duration,
        members,
        meeting_room_id: selectedRoom,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Meeting booked!');
      navigate("/dashboard");
    } catch (err) {
      alert(err.response.data.message || 'Booking failed');
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [startTime, duration, members]);

  return (
    <div className="container mt-5">
      <h3>Book a Meeting</h3>
      <form onSubmit={submitBooking} className="mt-3">
        <div className="mb-3">
          <label>Name of Meeting</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Date & Time</label>
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="form-control"
            minDate={new Date()}
          />
        </div>
        <div className="mb-3">
          <label>Duration</label>
          <select className="form-control" value={duration} onChange={e => setDuration(Number(e.target.value))}>
            <option value={30}>30 mins</option>
            <option value={60}>60 mins</option>
            <option value={90}>90 mins</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Members</label>
          <input className="form-control" type="number" min={1} value={members} onChange={e => setMembers(Number(e.target.value))} />
        </div>
        <div className="mb-3">
          <label>Available Rooms</label>
          <select className="form-control" value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)} required>
            <option value="">Select Room</option>
            {rooms.map(room => (
              <option key={room.id} value={room.id}>
                {room.name} - Capacity: {room.capacity}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary">Book Meeting</button>
        {roomError && (
          <div className="alert alert-danger mt-3" role="alert">
            {roomError}
          </div>
        )}
      </form>
    </div>
  );
}