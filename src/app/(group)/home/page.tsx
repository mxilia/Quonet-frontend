'use client'

import { useLogout, useUser } from "@/lib/auth";

const Home = () => {
  const { data: user, isLoading, error } = useUser();
  const logout = useLogout({});
  if(isLoading) return (
    <>
      <div>Is loading..</div>
    </>
  )
  return (
    <>
      <button onClick={() => logout.mutate()}>logout</button>
      <div>
        Current user: {user?.handler}
      </div>
    </>
  );
}

export default Home;
  