import type { Metadata } from "next";
import { NavbarLayout } from "./_components/navbar-layout";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

const AuthorizedLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
  return (
    <NavbarLayout>
      { children }
    </NavbarLayout>
  );
}

export default AuthorizedLayout;