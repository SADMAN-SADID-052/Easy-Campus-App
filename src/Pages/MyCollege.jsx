import { useContext, useEffect, useState } from "react";

import axios from "axios";
import Navbar from "../Shared/Navbar";
import { AuthContext } from "../Provider/AuthProvider";

const MyCollege = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://event-management-server-mu.vercel.app/my-college/${user.email}`)
        .then(res => setData(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`https://event-management-server-mu.vercel.app/my-college/${user.email}`, {
        rating,
        text: review
      });

      if (res.data.success) {
        alert("Review added!");
        setData(prev => ({ ...prev, review: { text: review, rating } }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) return <p className="text-center">Loading...</p>;

  const { college, review: existingReview } = data;

  return (


    <div>

      <header>
        <Navbar></Navbar>
      </header>
        <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My College Details</h2>
      <img src={college.image} className="w-full h-56 object-cover rounded" alt="" />
      <h3 className="text-xl mt-4 font-semibold">{college.name}</h3>
      <p>Admission Date: {college.admissionDate}</p>
      <p>Rating: {college.rating}</p>

      {existingReview ? (
        <div className="mt-6 p-4 bg-green-100 rounded">
          <h4 className="font-bold">Your Review:</h4>
          <p>Rating: {existingReview.rating}</p>
          <p>{existingReview.text}</p>
        </div>
      ) : (
        <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
          <h4 className="font-semibold text-lg">Add Review</h4>
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <textarea
            placeholder="Write your review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
          <button type="submit" className="btn btn-primary">Submit Review</button>
        </form>
      )}
    </div>
    </div>
  );
};

export default MyCollege;
