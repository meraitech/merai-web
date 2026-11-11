import { redirect } from "next/navigation";

// Redirect only works in `next dev`: with `output: "export"` this builds a blank
// error shell, so production `/` is redirected by vercel.json instead.
export default function RootPage() {
  redirect("/en");
}
