import { NavbarLayout } from "./_components/navbar-layout"

const AuthorizedLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <NavbarLayout>{children}</NavbarLayout>
}

export default AuthorizedLayout
