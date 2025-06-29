import { useEffect, useState } from 'react';
import api from "../api/axios";

export default function Dashboard() {
  const [meetings, setMeetings] = useState([]);
  const [filter, setFilter] = useState('upcoming');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ current: 1, last: 1 });

  const token = localStorage.getItem('token');

  const fetchMeetings = async () => {
    const res = await api.get('/my-meetings', {
      headers: { Authorization: `Bearer ${token}` },
      params: { filter, page }
    });

    setMeetings(res.data.data);
    setPagination({
      current: res.data.current_page,
      last: res.data.last_page
    });
  };

  useEffect(() => {
    fetchMeetings();
  }, [filter, page]);

  return (
    <div className="container mt-4">
      <h3>My Bookings</h3>

      <div className="mb-3">
        <button
          className={`btn btn-${filter === 'upcoming' ? 'primary' : 'outline-primary'} me-2`}
          onClick={() => { setFilter('upcoming'); setPage(1); }}
        >
          Upcoming
        </button>
        <button
          className={`btn btn-${filter === 'past' ? 'primary' : 'outline-primary'}`}
          onClick={() => { setFilter('past'); setPage(1); }}
        >
          Past
        </button>
      </div>

      {meetings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Meeting</th>
              <th>Room</th>
              <th>Date/Time</th>
              <th>Duration</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map(m => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.meeting_room?.name}</td>
                <td>{new Date(m.start_time).toLocaleString()}</td>
                <td>{m.duration} mins</td>
                <td>{m.members}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-outline-secondary"
          disabled={pagination.current <= 1}
          onClick={() => setPage(prev => prev - 1)}
        >
          Prev
        </button>
        <span>Page {pagination.current} of {pagination.last}</span>
        <button
          className="btn btn-outline-secondary"
          disabled={pagination.current >= pagination.last}
          onClick={() => setPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
