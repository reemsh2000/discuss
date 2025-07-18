import Link from "next/link";
import { Navbar, NavbarContent, NavbarBrand, NavbarItem } from "@nextui-org/react";
import HeaderAuth from "@/components/header-auth";
import SearchInput from "./search-input";
import { Suspense } from "react";

export default async function Header() {
	return (
		<Navbar className="shadow mb-6" isBordered>
			<NavbarBrand>
				<Link href="/" className="font-bold">
					Discuss
				</Link>
			</NavbarBrand>
			<NavbarContent justify="center">
				<NavbarItem>
					<Suspense>
						<SearchInput />
					</Suspense>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<HeaderAuth />
			</NavbarContent>
		</Navbar>
	);
}
