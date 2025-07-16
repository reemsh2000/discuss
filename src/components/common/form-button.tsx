'use client';

import { Button } from "@nextui-org/react";

interface FormButtonProps {
    children: React.ReactNode;
}

export default function FormButton({ isLoading, children }: FormButtonProps & { isLoading?: boolean }) {
    console.log("FormButton pending:", isLoading);
    return (
        <Button type="submit" isLoading={isLoading}>{children}</Button>
    )
}
