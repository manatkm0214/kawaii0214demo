import { Auth0Client } from "@auth0/nextjs-auth0/server"
import { getAllowedAppBaseUrls } from "@/lib/auth/app-base-url"

export const auth0 = new Auth0Client({
  appBaseUrl: getAllowedAppBaseUrls(),
  authorizationParameters: {
    scope: "openid profile email",
  },
  signInReturnToPath: "/",
})
