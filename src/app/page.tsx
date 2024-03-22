import path from "@/path";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={path.categoryCreate()}>Create a category</Link>
    </div>
  );
}
