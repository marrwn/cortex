import { getSyllabus } from "@/lib/engine";
import LearnLayoutClient from "./LearnLayoutClient";
import "./globals.css"; // Ensure CSS is imported here!

export default async function LearnLayout({ children }) {
  // 1. Fetch data on the server
  const syllabusData = (await getSyllabus()) || [];

  // 2. Wrap the children in the client-side shell
  return (
    <LearnLayoutClient syllabusData={syllabusData}>
      {children}
    </LearnLayoutClient>
  );
}
