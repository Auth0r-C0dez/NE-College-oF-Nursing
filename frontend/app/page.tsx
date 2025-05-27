import { redirect } from "next/navigation"

/**
 * Root page component
 * Redirects users to the login page as there's no public homepage
 */
export default function RootPage() {
  redirect("/login")
}
