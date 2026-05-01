import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { use } from "react";

const Register = () => {
    const { signInWithGoogle, setUser, createUser, profileUpdate } = use(AuthContext); ``

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        console.log(name, email, photo, password);

        createUser(email, password)
            .then(result => {
                console.log("user created succesffully ", result)

                const updatedProfile = {
                    displayName: name,
                    photoURL: photo,
                }

                profileUpdate(updatedProfile)
                    .then(result => { console.log("profile udpdated successfully", result) })
                    .catch(err => console.log(err))

                const newUser = {
                    name: name,
                    email: email,
                    photo: photo,

                }

                fetch('http://localhost:3000/users', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .catch(data => console.log(data))

            })
            .catch(err => console.log(err))

    }

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result)
                setUser(result.user)
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,

                }

                fetch('http://localhost:3000/users', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
            })

            .catch(error => console.log(error))
    }
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">

                    <div className="space-y-4 text-center">
                        <h1 className="text-5xl font-bold">Register Now!</h1>
                        <p>Already have an account? <Link to="/login"> Login now</Link> </p>
                    </div>

                    <form onSubmit={handleRegister} className="fieldset">
                        <label className="label">Name</label>
                        <input type="text" name="name" className="input" placeholder="Enter name" />
                        <label className="label">Email</label>
                        <input type="email" name="email" className="input" placeholder="Enter email" />
                        <label className="label">Image-URL</label>
                        <input type="text" name="photo" className="input" placeholder="Enter URL of image" />
                        <label className="label">Password</label>
                        <input type="password" name="password" className="input" placeholder="Enter your password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Register</button>
                    </form>
                    {/* Google */}
                    <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Register;