import "@/styles/globals.css";

const AuthLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  /*for prefetching data n send it to client with query keys so queryClient doesn't fetch. */
  return (
    <div className="font-sans antialiased">
      {children}
    </div>
  );
}

export default AuthLayout;