import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Shared/Navbar";

const Admission = () => {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    image: ""
  });

  useEffect(() => {

    axios.get("https://event-management-server-mu.vercel.app/colleges")
      .then(res => setColleges(res.data))
      .catch(err => console.error("Error fetching colleges:", err));
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("https://event-management-server-mu.vercel.app/admissions", {
        ...formData,
        collegeId: selectedCollege._id,
        collegeName: selectedCollege.name
      });
      if (response.data.success) {
        alert("Admission form submitted successfully!");
        setSelectedCollege(null);
        setFormData({
          name: "", subject: "", email: "", phone: "",
          address: "", dob: "", image: ""
        });
      }
    } catch (error) {
      console.error("Error submitting admission:", error);
    }
  };

  return (
<div>

  <header>

    <Navbar></Navbar>
  </header>
      <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Select a College</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {colleges.map(college => (
          <div
            key={college._id}
            className="p-4 border rounded hover:bg-blue-600 cursor-pointer"
            onClick={() => setSelectedCollege(college)}
          >
            {college.name}
          </div>
        ))}
      </div>

      {selectedCollege && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-sky-600">
            Apply to: {selectedCollege.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="name" placeholder="Candidate Name" value={formData.name} onChange={handleInputChange} required className="input input-bordered " />
            <input name="subject" placeholder="Subject" value={formData.subject} onChange={handleInputChange} required className="input input-bordered" />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required className="input input-bordered" />
            <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required className="input input-bordered" />
            <input name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required className="input input-bordered" />
            <input name="dob" type="date" placeholder="Date of Birth" value={formData.dob} onChange={handleInputChange} required className="input input-bordered" />
            <input name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} required className="input input-bordered" />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white px-6 py-2 rounded">
            Submit
          </button>
        </form>
      )}
    </div>
</div>
  );
};

export default Admission;
