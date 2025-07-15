import Link from "next/link";
import { Input, Navbar, NavbarContent, NavbarBrand, NavbarItem } from "@nextui-org/react";
import HeaderAuth from "@/components/header-auth";

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
					<Input placeholder="Search..." aria-label="Search" />
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
                <HeaderAuth />
            </NavbarContent>
		</Navbar>
	);
}
