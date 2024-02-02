import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import zxcvbn from "zxcvbn";
import useCustomNavigate from "../../Routers/Pathhook";
import CommonSection from "../../components/CommonSection";
import Helmet from "../../components/Helmet/Helmet";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        feedback: "",
    });
    const goToPage = useCustomNavigate();

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const toggleShowPasswordConfirm = () => {
      setShowPasswordConfirm(!showPasswordConfirm);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    
        // Use zxcvbn to get password strength feedback
        const result = zxcvbn(newPassword);
    
        setPasswordStrength({
          score: result.score,
          feedback: result.feedback.suggestions.join(" "),
        });
      };
  
    const handleSignup = async () => {
        if (!username || !firstname || !lastname || !email || !password || !confirmPassword) {
            message.error("Fields cannot be left empty");
            return;
        }
        if (password !== confirmPassword) {
            message.error("Passwords do not match");
            return;
        }
    
        const user = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        };
        //   console.log(user);
        try {
            const response = await axios.post("http://localhost:3000/users/signup", user);
            console.log(response);
            console.log("In message.error");
            if (response.status === 201) {
                console.log(response.data.message);
                message.success(response.data.message);
                goToPage("/signin");
            } else {
                console.log("In message.error");
                console.log(response.data.message);
            }
        } catch (error) {
            console.log('Network error:', error.message);
            if (!error.response) {
                // Handle network errors
                message.error('Network error. Please try again later.');
                return;
            }
            console.log('Server response:', error.response.data);

            const errorMessage = error.response.data.error;
        
            console.log('Error message:', errorMessage);
            
            // Display the error message using Ant Design's message.error
            message.error(errorMessage, 5);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); 
        handleSignup(); 
      };

    return (
    <Helmet title="Sign Up">
        <CommonSection title="Sign Up" />
            <div className="relative flex flex-col justify-center overflow-hidden p-20">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                    {/* <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                        Sign Up
                    </h1> */}
                    <form className="mt-6" onSubmit={handleFormSubmit}>
                        <div className="mb-2">
                            <label
                                htmlFor ="username"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor ="firstname"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor ="lastname"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor ="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor ="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                value={password}
                                onChange={handlePasswordChange}
                                />
                                <span
                                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                                onClick={toggleShowPassword}
                                >
                                {showPassword ? (
                                    <AiFillEye/>

                                ) : (
                                    <AiFillEyeInvisible/>
                                )}
                                </span>
                            </div>
                            </div>
                            <div className="mt-2 flex items-center">
                                <div
                                    className={`w-1/4 h-2 bg-purple-300 rounded-md ${
                                    passwordStrength.score >= 1 ? 'bg-red-500' : ''
                                    }`}
                                ></div>
                                <div
                                    className={`w-1/4 h-2 bg-purple-300 rounded-md ${
                                    passwordStrength.score >= 2 ? 'bg-yellow-500' : ''
                                    }`}
                                ></div>
                                <div
                                    className={`w-1/4 h-2 bg-purple-300 rounded-md ${
                                    passwordStrength.score >= 3 ? 'bg-yellow-300' : ''
                                    }`}
                                ></div>
                                <div
                                    className={`w-1/4 h-2 bg-purple-300 rounded-md ${
                                    passwordStrength.score >= 4 ? 'bg-green-400' : ''
                                    }`}
                                ></div>
                            </div>

                            <div className="mb-2">
                            <label
                                htmlFor ="confirmPassword"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                type={showPasswordConfirm ? "text" : "password"}
                                id="confirmPassword"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <span
                                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                                onClick={toggleShowPasswordConfirm}
                                >
                                {showPasswordConfirm ? (
                                    <AiFillEye/>
                                ) : (
                                    <AiFillEyeInvisible/>
                                )}
                                </span>
                            </div>
                            </div>
                        <a
                            href="#"
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forget Password?
                        </a>
                        <div className="mt-6">
                                <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-800 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                    Sign Up
                                </button>
                        </div>
                    </form>
                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        {" "}
                        Already have an account?{" "}
                            <Link className="font-medium text-purple-600 hover:underline" to="/signin">Sign In</Link>
                    </p>
                </div>
            </div>
        </Helmet>
    )
    
}