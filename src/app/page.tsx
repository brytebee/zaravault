import path from "@/path";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>This page is for featured products</p>
      <br />
      <br />
      <Link href={path.categories()} className="underline text-blue-300">
        View categories
      </Link>
      <br />
      <br />
      <Link href={path.categoryCreate()} className="underline text-green-300">
        Create a category
      </Link>
    </div>
  );
}
