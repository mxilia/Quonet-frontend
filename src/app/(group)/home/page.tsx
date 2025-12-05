'use client'

import { Thread } from "@/features/threads/components/thread";
import { getUser } from "@/lib/auth";
import { User } from "@/types/api";

const Home = async () => {
  const user : User = await getUser()
  return (
    <>
      <Thread imageUrl={user.profile_url} title={user.handler}></Thread>
    </>
  );
}

export default Home;
  