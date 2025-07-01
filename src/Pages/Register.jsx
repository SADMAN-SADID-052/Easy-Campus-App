import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Signup = () => {
  const { createUser, setUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    // Password validation
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password should be at least 6 characters long!",
      });
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must include uppercase, lowercase, number, and special character!",
      });
      return;
    }

    // Firebase Signup
    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          setUser(user);

          // Store user email in your database
          axiosPublic.post("/users", { email })
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Registration Successful!",
                showConfirmButton: false,
                timer: 2000,
              });

              e.target.reset();
              navigate(location?.state || "/");
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Database Error",
                text: error.message,
              });
            });
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="contain py-10">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden mt-16 border-2 border-[#22d3ee]">
        <h2 className="text-2xl uppercase font-medium mb-3 text-center">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 mb-2 block dark:text-white">Name</label>
              <input
                type="text"
                name="name"
                className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:outline-none focus:border-teal-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block dark:text-white">Email</label>
              <input
                type="email"
                name="email"
                className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:outline-none focus:border-teal-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block dark:text-white">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:outline-none focus:border-teal-500"
                placeholder="Photo URL"
                required
              />
            </div>
            <div>
              <label className="text-gray-600 mb-2 block dark:text-white">Password</label>
              <input
                type="password"
                name="password"
                className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:outline-none focus:border-teal-500"
                placeholder="***********"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 block w-full py-2 text-center text-white bg-gradient-to-r from-[#60a5fa] to-[#22d3ee] rounded hover:bg-transparent hover:text-black transition font-medium uppercase"
          >
            Sign Up
          </button>

          <div className="flex gap-2 pt-5 justify-center">
            <p className="text-md text-[#60a5fa]">Already have an account?</p>
            <Link to="/auth/login" className="text-md underline text-purple-500">
              Sign In Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
