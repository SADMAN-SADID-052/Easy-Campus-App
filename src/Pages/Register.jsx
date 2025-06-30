import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Signup = () => {
  const { createUser, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    // Password length validation
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password should be at least 6 characters long!",
      });
      return;
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must include uppercase, lowercase, number, and special character!",
      });
      return;
    }

    // Firebase signup
    createUser(email, password)
      .then((result) => {
        const user = result.user;

        // Update profile with name and photo
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser(user);

            Swal.fire({
              icon: "success",
              title: "Registration Successful!",
              showConfirmButton: false,
              timer: 2000,
            });

            e.target.reset();
            navigate(location?.state ? location.state : "/");
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Profile Update Failed",
              text: error.message,
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
        <h2 className="text-2xl uppercase font-medium mb-3 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSignUp}>
          <div className="space-y-2">
            <div>
              <label className="text-gray-600 mb-2 block dark:text-white">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="block w-full border border-gray-300 px-4 py-3 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-white"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <label className="text-gray-600 mb-2 block dark:text-white">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="block w-full border border-gray-300 px-4 py-3  text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <label className="text-gray-600 mb-2 block dark:text-white">
                Photo URL
              </label>
              <input
                type="text"
                name="photo"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                placeholder="Photo URL"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <label className="text-gray-600 mb-2 block dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="block w-full border border-gray-300 px-4 py-3  text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                placeholder="***********"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="block w-full py-2 text-center text-white bg-gradient-to-r from-[#60a5fa] to-[#22d3ee]  rounded hover:bg-transparent hover:text-black transition uppercase font-roboto font-medium"
            >
              Sign Up
            </button>

            <div className="flex gap-2 pt-5">
              <p className="text-xl text-[#60a5fa]">Already have an account?</p>
              <Link
                to="/auth/login"
                className="text-xl underline text-purple-500"
              >
                Sign In Here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
