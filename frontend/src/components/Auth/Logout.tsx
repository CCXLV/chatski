import { logout } from "../../utils/service/AuthService";
import { redirect } from "../../utils/functions/auth";

function Logout() {

   logout()

   return redirect("/login")
}

export default Logout;