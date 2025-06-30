import React, { useContext } from "react";
import Navbar from "../Shared/Navbar";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";

const AddEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddEvent = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const email = user?.email;
    const name = form.name.value;
    const datetime = form.datetime.value;
    const location = form.location.value;
    const description = form.description.value;
    const attendeeCount = parseInt(form.attendeeCount.value) || 0;

    const newEvent = {
      title,
      name,
      email,
      datetime,
      location,
      description,
      attendeeCount,
    };

    fetch("http://localhost:5000/addEvent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Swal.fire({
        //   title: "Success!",
        //   text: "New Car Added Successfully!!",
        //   icon: "success",
        //   confirmButtonText: "Cool",
        // });
      })

      .catch((err) => {
        console.error("Error submitting events:", err);
      });
    navigate("/events");

    console.log("Event added:", newEvent);

    Swal.fire({
      icon: "success",
      title: "Event Added Successfully!",
      showConfirmButton: false,
      timer: 2000,
    });

    form.reset();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#60a5fa]">
            Add New Event
          </h2>

          <form onSubmit={handleAddEvent} className="space-y-6">
            {/* Event Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Event Title"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-teal-500 text-black"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={user?.displayName}
                  placeholder="Your Full Name"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-teal-500 text-black"
                  required
                />
              </div>
            </div>

            {/* Date & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="datetime"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-teal-500 text-black"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Event Location"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-teal-500 text-black"
                  required
                />
              </div>
            </div>

            {/* Attendee Count */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Attendee Count
              </label>
              <input
                type="number"
                name="attendeeCount"
                defaultValue={0}
                min={0}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-teal-500 text-black"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Describe your event..."
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-teal-500 text-black"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#60a5fa] to-[#22d3ee] hover:bg-teal-600   text-white px-8 py-2 rounded-md text-lg font-semibold transition cursor-pointer"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
