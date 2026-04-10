import { redirect } from "next/navigation";

export default function Home() {
  // Automatically redirect root to the portal login/dashboard
  redirect("/register");
}
