import { db } from "@/db";
import path from "@/path";
import Link from "next/link";

export default async function CategoriesPage() {
  const category = await db.category.findMany({});

  return (
    <div>
      Categories page
      {category.length < 1 ? (
        <p>No created category yet</p>
      ) : (
        <div>
          {category.map((cat) => (
            // Category card
            <div>
              <Link href={path.products(cat.name)}>
                <p>{cat.name}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
      <Link href={path.categoryCreate()} className="underline text-blue-300">
        Add a category
      </Link>
    </div>
  );
}
