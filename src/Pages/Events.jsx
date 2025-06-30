import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Shared/Navbar";
import { AuthContext } from "../Provider/AuthProvider";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Swal from "sweetalert2";
dayjs.extend(isBetween);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [userJoinedEvents, setUserJoinedEvents] = useState(new Set());

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, filterDate, events]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/event");
      const sortedEvents = (response.data.events || []).sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      );
      setEvents(sortedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    setLoading(false);
  };

  const applyFilters = () => {
    const today = dayjs();
    let result = [...events];

    if (search) {
      result = result.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterDate) {
      result = result.filter((e) => {
        const eventDate = dayjs(e.datetime);
        switch (filterDate) {
          case "today":
            return eventDate.isSame(today, "day");
          case "currentWeek":
            return eventDate.isSame(today, "week");
          case "lastWeek":
            return eventDate.isSame(today.subtract(1, "week"), "week");
          case "currentMonth":
            return eventDate.isSame(today, "month");
          case "lastMonth":
            return eventDate.isSame(today.subtract(1, "month"), "month");
          default:
            return true;
        }
      });
    }

    setFilteredEvents(result);
  };

  const handleJoin = async (event) => {
    if (!user) return alert("You must be logged in to join.");
    if (userJoinedEvents.has(event._id)) return Swal.fire("Error", "Already joined.", "error"); ;

    try {
      const res = await axios.patch(
        `http://localhost:5000/event/${event._id}`,
        { email: user.email }
      );
      if (res.data.success) {
        Swal.fire("Success", "You have joined the event.", "success");
        setUserJoinedEvents(new Set([...userJoinedEvents, event._id]));
        fetchEvents();
      } else {
        Swal.fire("Error", "Already joined.", "error");
      }
    } catch (error) {
      console.error("Join failed:", error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div>
      <header>
        <Navbar />
      </header>

      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex gap-6 items-center justify-center mt-10 mb-10">
          <input
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-64"
          />

          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md bg-white text-black"
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="currentWeek">Current Week</option>
            <option value="lastWeek">Last Week</option>
            <option value="currentMonth">Current Month</option>
            <option value="lastMonth">Last Month</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setFilterDate("");
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md"
          >
            Clear Filters
          </button>
        </div>

        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No events found.</p>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {filteredEvents.map((event, idx) => {
              const {
                title,
                name,
                datetime,
                location,
                description,
                attendeeCount,
              } = event;

              const formattedDate = new Date(datetime).toLocaleString();

              return (
                <div
                  key={idx}
                  className="bg-white shadow-md rounded-lg p-6 w-full"
                >
                  <div>
                    <img
                      className="w-20 mx-auto"
                      src="https://img.icons8.com/?size=160&id=xaOSPJn9D7XT&format=png"
                      alt="event"
                    />
                    <p className="text-xl font-bold text-teal-700 mb-2 text-center">
                      {title}
                    </p>
                  </div>
                  <p className="text-gray-600 font-medium">Posted by: {name}</p>
                  <p className="text-gray-500 text-sm mb-1">
                    Date & Time: {formattedDate}
                  </p>
                  <p className="text-gray-500 text-sm mb-1">
                    Location: {location}
                  </p>
                  <p className="text-gray-700 my-2">{description}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Attend People: {attendeeCount}
                  </p>
                  <button
                    onClick={() => handleJoin(event)}
                    className="bg-gradient-to-r from-[#60a5fa] to-[#22d3ee]  hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded"
                  >
                    Join Event
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
