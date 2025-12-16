'use client';

import { useLogout } from "@/lib/auth"

const SettingsPage = () => {
  const logout = useLogout();

  return (
    <div className="text-white pt-15 bg-black min-h-screen">
      <button onClick={() => logout.mutate()}>
        logout
      </button>
    </div>
  )
}

export default SettingsPage;