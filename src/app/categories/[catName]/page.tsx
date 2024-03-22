import path from "@/path";
import Link from "next/link";

interface CatShowProps {
  params: {
    catName: string;
  };
}
export default function CategoryShowPage({
  params: { catName },
}: CatShowProps) {
  return (
    <div>
      Category show page
      <p>{catName}</p>
      <Link href={path.productCreate(catName)}>Add Product</Link>
    </div>
  );
}
