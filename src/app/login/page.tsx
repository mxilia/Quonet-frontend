import { path } from "@/config/path";
import { RedirectButton } from "./_components/redirect-button";

const LoginPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-neutral-900">
      <div className="bg-neutral-800 h-100 w-100 rounded-xl flex items-center flex-col p-2 gap-2 pt-5">
        <h1 className="text-neutral-200 text-2xl font-bold">Welcome to Quonet!</h1>
        <span className="text-xs w-10/12 text-neutral-300 mb-3">By continuing you indicate that you agree to Quonet’s 
          <a href="/" className="text-blue-500 hover:underline"> Terms of Service</a> and 
          <a className="text-blue-500 hover:underline"> Privacy Policy.</a>
        </span>
        <RedirectButton text="Sign in with Google Account" redirectPath={path.auth.oauth.getHref()} imgPath="/google-logo.png"/>
        <div className="text-neutral-500 flex w-10/12 items-center">
          <div className="border-t w-full h-0"></div>
          <div className="ml-1 mr-1">OR</div>
          <div className="border-t w-full h-0"></div>
        </div>
        <RedirectButton text="Anonymously read Quonet" redirectPath={path.home.getHref()} imgPath="/default-avatar.png"/>
        <div className="text-neutral-300 text-xs">About - Privacy - Terms - Contact</div>
      </div>
    </div>
  );
}

export default LoginPage;