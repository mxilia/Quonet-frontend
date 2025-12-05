import { env } from "@/config/env";

export const LoginForm = () => {
  return (
    <div>
      <a href={`${env.API_URL}/auth/google/login`}>
        <button>
          click on me bro
        </button>
      </a>
    </div>
  )
}