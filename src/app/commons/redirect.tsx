import Link from "next/link";

export default function LinkTo(link: object, text: string) {
  <Link href={link} className=" underline text-blue-300">
    {text}
  </Link>;
}
