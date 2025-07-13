"use client";
import { useSession } from "next-auth/react";

export default function Profile() {
	const session = useSession();

	if (session?.data?.user) {
		return <div>user signed in</div>;
	} else {
		return <div>user not signed in</div>;
	}
}
