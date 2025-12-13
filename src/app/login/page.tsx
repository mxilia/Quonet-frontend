import { path } from "@/config/path";
import { GoogleLoginButton } from "./_components/google-login";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-neutral-800 h-100 w-100">
        Login
        <GoogleLoginButton/>
      </div>
    </div>
  );
}

export default LoginPage;