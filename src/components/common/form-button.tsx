'use client';

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
    children: React.ReactNode;
}

export default function FormButton({ children }: FormButtonProps) {
    const  { pending } =useFormStatus();
    console.log("FormButton pending:", pending);
    return (
        <Button type="submit" isLoading={pending}>{children}</Button>
    )
}
