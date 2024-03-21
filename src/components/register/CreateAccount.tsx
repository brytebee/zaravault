import * as actions from "@/actions";

export default function CreateAccountPage() {
  return (
    <form action={actions.createAccount} className="">
      <input type="email" name="email" placeholder="cutie@zara.com" />
      <input type="password" name="password" placeholder="*********" />
      <button type="submit">Register</button>
    </form>
  );
}
