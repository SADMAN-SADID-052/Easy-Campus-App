import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Shared/Navbar";
import { Link } from "react-router";

const College = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const res = await axios.get("http://localhost:5000/colleges");
      setColleges(res.data || []);
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-center mb-8">Top Colleges</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading colleges...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <div
                key={college._id}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition"
              >
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-teal-700">
                  {college.name}
                </h3>
                <p className="text-gray-600">Rating: ⭐ {college.rating}</p>
                <p className="text-gray-600">
                  Admission Date: {college.admissionDate}
                </p>
                <p className="text-gray-600">
                  Research Papers: {college.researchCount}
                </p>

                <Link
                  to={`/colleges/${college._id}`}
                  className="inline-block mt-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-white px-4 py-2 rounded hover:scale-105 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default College;
