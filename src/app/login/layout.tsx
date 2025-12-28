import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};


const AuthLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="antialiased">
      {children}
    </div>
  );
}

export default AuthLayout;