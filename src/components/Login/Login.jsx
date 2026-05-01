import { use } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const { login } = use(AuthContext);
    const location = useLocation();
    console.log(location);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        login(email, password)
            .then(result => console.log("user logged in successfully", result))
            .catch(err => console.log(err))

    }
    return (
        <div>
            <div className="flex min-h-screen justify-center items-center">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">

                        <div className="space-y-4 text-center">
                            <h1 className="text-5xl font-bold">Login Now!</h1>
                            <p>Don't have an account? <Link to="/register"> Register now</Link> </p>
                        </div>

                        <form onSubmit={handleLogin} className="fieldset">

                            <label className="label">Email</label>
                            <input type="email" name="email" className="input" placeholder="Enter email" />

                            <label className="label">Password</label>
                            <input type="password" name="password" className="input" placeholder="Enter your password" />

                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Login</button>

                        </form>
                        {/* Google */}
                        <button className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;