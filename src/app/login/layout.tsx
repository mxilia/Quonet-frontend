import "@/styles/globals.css";

const AuthLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="font-sans antialiased">
      {children}
    </div>
  );
}

export default AuthLayout;