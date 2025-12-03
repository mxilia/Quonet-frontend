
const Layout = ({ children } : { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex w-full h-15 bg-neutral-800">
        <div> Forum </div>
      </div>
      { children }
    </>
  )
}

export const NavbarLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <>
      <Layout>{ children }</Layout>
    </>
  )
}