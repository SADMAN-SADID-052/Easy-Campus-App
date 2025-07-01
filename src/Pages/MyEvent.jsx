import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import Navbar from "../Shared/Navbar";

const MyEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchUserEvents();
    }
  }, [user]);

  const fetchUserEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://event-management-server-mu.vercel.app/events?email=${user.email}`);
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching user events:", error);
    }
    setLoading(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://event-management-server-mu.vercel.app/event/${id}`);
          Swal.fire('Deleted!', 'Your event has been deleted.', 'success');
          fetchUserEvents();
        } catch (error) {
          Swal.fire('Error', 'Failed to delete event', 'error');
        }
      }
    });
  };

  return (
  <div>

    <header>
        <Navbar></Navbar>
    </header>
      <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Events</h2>

      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p>You haven’t added any events yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-bold text-teal-700 mb-2">{event.title}</h3>
              <p><span className="font-semibold">Posted by:</span> {event.name}</p>
              <p><span className="font-semibold">Date & Time:</span> {new Date(event.datetime).toLocaleString()}</p>
              <p><span className="font-semibold">Location:</span> {event.location}</p>
              <p><span className="font-semibold">Description:</span> {event.description}</p>
              <p><span className="font-semibold">Attendees:</span> {event.attendeeCount}</p>

              <div className="flex gap-3 mt-4">
                <Link
                  to={`/update-event/${event._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default MyEvents;
