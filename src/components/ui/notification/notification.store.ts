import { create } from "zustand";

type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

type NotificationStore = {
  notifications: Notification[];
  notify: (n : Omit<Notification, "id">) => void;
  remove: (id : string) => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  notify: (n) =>
    set((s) => ({
      notifications: [
        ...s.notifications,
        { ...n, id: crypto.randomUUID() },
      ],
    })),

  remove: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    })),
}));