import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Navbar from "../Shared/Navbar";

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await axios.get(`https://event-management-server-mu.vercel.app/colleges/${id}`);
        setCollege(res.data);
      } catch (error) {
        console.error("Error fetching college details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (!college) return <p className="text-center mt-10 text-red-600">College not found</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <h1 className="text-3xl font-bold text-teal-700 mb-2">{college.name}</h1>
        <p className="text-gray-600 mb-2">Rating: ⭐ {college.rating}</p>
        <p className="text-gray-600 mb-2">Admission Date: {college.admissionDate}</p>
        <p className="text-gray-600 mb-2">Research Count: {college.researchCount}</p>
        <p className="text-gray-700 mb-4">{college.description}</p>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Events</h2>
          <ul className="list-disc ml-5 text-gray-700">
            {college.events?.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Sports Facilities</h2>
          <ul className="list-disc ml-5 text-gray-700">
            {college.sports?.map((sport, index) => (
              <li key={index}>{sport}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;
