import { registerForm } from "../../utils/functions/auth";
import { getCurrentUser } from "../../utils/service/AuthService";
import { redirect } from "../../utils/functions/auth";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Auth/styles.css";


function Register() {
    const user = getCurrentUser();
    if (user) {
        return redirect("/")
    }

    
    return (
        <div className="Auth-form-container">
            <form className="Auth-form" method="post" onSubmit={registerForm}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign up</h3>
                    <div className="form-group mt-3">
                        <label>Username <span className="error-message username-error"></span></label>
                        <input
                        type="text"
                        className="form-control mt-1 username"
                        placeholder="Enter username"
                        required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address <span className="error-message email-error"></span></label>
                        <input
                        type="email"
                        className="form-control mt-1 email"
                        placeholder="Enter email"
                        required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                        type="password"
                        className="form-control mt-1 password"
                        placeholder="Enter password"
                        required
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                        Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Already have an account? <a href="/login">Sign in</a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Register;