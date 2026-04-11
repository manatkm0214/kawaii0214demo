import { Auth0Client } from "@auth0/nextjs-auth0/server"

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || "dev-mlg3q0p27ecq1qnh.us.auth0.com"
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || "e8qkmeBYFnNAfjDGKF7MtkwhyIY4dxrS"
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET || "w_7EJLXKKPeYz-4SgFYoeXAM5yIQG-WqPw4rTqeAokZBvEHtkiCDRTetAnS1xQxA"
const AUTH0_SECRET = process.env.AUTH0_SECRET || "f113b5245536858915d94fcb2c5af9b41aa555e1c2e9077ad822ce90e3d77400"
const APP_BASE_URL = process.env.APP_BASE_URL || "https://kawaii0214.vercel.app"

export const auth0 = new Auth0Client({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET,
  secret: AUTH0_SECRET,
  appBaseUrl: APP_BASE_URL,
  authorizationParameters: {
    scope: "openid profile email",
  },
  signInReturnToPath: "/",
})
