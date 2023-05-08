import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";

const SignUp = () => {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [setUserStateValue] = useRecoilState(userState);
    const [signUpErrorMsg, setSignUpErrorMsg] = useState("");

    const handleInput = (e) => {
        const { name, value } = e.target
        setNewUser({
            ...newUser,
            [name]: value,
        })
    }

    const checkEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const checkInput = (name, email, password) => {
        if (name === "" || email === "" || password === "") {
            setSignUpErrorMsg("Please dont leave any box blank!");
            return true
        } else if (!checkEmail(email)) {
            setSignUpErrorMsg("Invalid email address!")
            return true
        }
        else if (name.length < 3) {
            setSignUpErrorMsg("Enter a valid name!")
            return true
        }
        else if (password.length < 6) {
            setSignUpErrorMsg("Please enter password of at least 6 characters in length");
            return true
        } else {
            return false
        }
    }


    const handleSignUp = async (e) => {
        e.preventDefault();

        // checkErrors();

        const { name, email, password } = newUser;

        if (!checkInput(name, email, password)) {
            setSignUpErrorMsg("");
            try {
                const res = await axios.post(process.env.REACT_APP_SIGNUP, newUser);
                if (res.data.message === "Success!") {
                    alert("Account succesfully created!")
                    navigate("/add-event")
                    setUserStateValue({
                        name: name,
                        email: email,
                    })
                } else {
                    setSignUpErrorMsg(res.data.message);
                }
            } catch (error) {
                console.log(error)
            }
        }
        else {
            alert("error")
        }
    }

    return (
        <>
            <Navbar />
            <div>
                <div className="w-full text-center pt-5">
                    <h1 className="text-2xl font-medium tracking-wider leading-relaxed">Sign Up</h1>
                </div>
                <div className="py-4">
                    <form method="POST" className="max-w-4xl w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto flex flex-col gap-6 bg-white py-12 px-6 rounded-xl">
                        <div className="w-full mx-auto flex flex-col justify-center">
                            <label
                                htmlFor="name"
                                className="text-gray-600 font-bold uppercase tracking-wide mb-2"
                            >
                                Username
                            </label>
                            <input
                                className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="text-gray-600 font-bold uppercase tracking-wide mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                id="email"
                                name="email"
                                type="text"
                                placeholder="example@email.com"
                                autoComplete="example@email.com"
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label
                                htmlFor="password"
                                className="text-gray-600 font-bold uppercase tracking-wide mb-2"
                            >
                                Password
                            </label>
                            <input
                                className="w-full bg-gray-200 text-gray-600 md:text-lg border border-gray-200 p-4 leading-tight rounded-lg appearance-none focus:bg-white focus:border-gray-500"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="***********"
                                autoComplete="current-password"
                                onChange={handleInput}
                                required
                            />
                        </div>
                        {signUpErrorMsg && <p className="text-center text-red-500 py-2">{signUpErrorMsg}</p>}
                        <div className="w-full flex justify-center mt-4 pt-10 border-t">
                            <button className="mx-auto bg-indigo-400 text-white font-bold uppercase px-8 py-3 rounded-lg shadow hover:shadow-lg hover:bg-indigo-500 outline-none tracking-wide ease-linear transition-all duration-150"
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp