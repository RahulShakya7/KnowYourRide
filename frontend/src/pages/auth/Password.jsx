import { message } from "antd";
import axios from "axios";
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import CommonSection from "../../components/CommonSection";
import Helmet from "../../components/Helmet/Helmet";

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowPasswordConfirm(!showPassword);
    };

    const handlePasswordSubmit = async () => {
        try {
            if (!oldPassword || !newPassword || !confirmPassword) {
                message.error("All fields are required");
                return;
            }

            if (newPassword !== confirmPassword) {
                message.error("New password and confirm password do not match");
                return;
            }

            const response = await axios.put("http://localhost:3000/users/changepw", {
                oldPassword: oldPassword,
                newPassword: newPassword
            });

            if (response.status === 200) {
                message.success(response.data.message);
            } else {
                const errorMessage = response.data.error;
                message.error(errorMessage);
            }
        } catch (error) {
            const errorMessage = error.response.data.error;
            message.error(errorMessage);
        }
    };

    return (
        <Helmet title="Change Password">
            <CommonSection title="Change Password" />
            <div className="relative flex p-20">
                <div className="w-full p-10 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                    <form className="mt-6" onSubmit={handlePasswordSubmit}>
                        <div className="mb-2">
                            <label htmlFor="oldPassword" className="block text-sm font-semibold text-gray-800">
                                Old Password
                            </label>
                            <input
                                type="password"
                                id="oldPassword"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-800">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="newPassword"
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
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
                        <div className="mb-2 relative">
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800">
                                Confirm Password
                            </label>
                            <input
                                type={showPasswordConfirm ? "text" : "password"}
                                id="confirmPassword"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <span
                                className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                                onClick={toggleShowConfirmPassword}
                            >
                                {showPasswordConfirm ? (
                                    <AiFillEye/>
                                ) : (
                                    <AiFillEyeInvisible/>
                                )}
                            </span>
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-800 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Helmet>
    )
}
