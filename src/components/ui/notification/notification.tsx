"use client"

import { BlurBackground } from "../background/blur-background"
import { useNotificationStore } from "./notification.store"

export const Notifications = () => {
  const notifications = useNotificationStore((s) => s.notifications)
  const remove = useNotificationStore((s) => s.remove)

  return (
    <>
      <div className="fixed top-1/2 left-1/2 z-60 flex -translate-x-1/2 -translate-y-1/2 flex-col space-y-2">
        {notifications.map((e) => (
          <button
            key={e.id}
            className="max-w-75 rounded-xl border border-(--foreground) bg-black p-3 text-sm text-neutral-100"
            onClick={() => remove(e.id)}
          >
            <span className={e.type === "success" ? "text-green-500" : "text-red-500"}>
              {e.type}:
            </span>{" "}
            {e.message}
            <br />
            <span className="text-xs text-neutral-600">(click this to continue)</span>
          </button>
        ))}
      </div>
      {notifications.length > 0 && <BlurBackground />}
    </>
  )
}
