// import Image from "next/image";
import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import { auth } from "@/auth";
import Profile from "@/component/profile";

export default async function Home() {
  const session = await auth();
	return (
		<div>
			<form action={actions.signIn}>
				<Button type="submit">Sign in</Button>
			</form>
			<form action={actions.signOut}>
				<Button type="submit">Sign out</Button>
			</form>
      {
        session?.user ? <div>{JSON.stringify(session.user)} </div> : <div> signed out</div>
      }
      <Profile />
		</div>
	);
}
