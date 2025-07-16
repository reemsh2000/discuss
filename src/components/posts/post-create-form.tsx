
"use client";

import { startTransition, useActionState } from "react";
import { Input, Textarea,Popover, PopoverTrigger, PopoverContent , Button } from "@nextui-org/react";
import FormButton from "@/components/common/form-button";
import * as actions from "@/actions";
interface PostCreateFormProps {
    slug: string;
}
export default function PostCreateForm({slug}: PostCreateFormProps) {
 const [formState, action, isPending] = useActionState(actions.createPost.bind(null, slug), {
		errors: {},
	});
	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		startTransition(() => {
			action(formData);
		});
	}
	return (
		<Popover placement="left">
			<PopoverTrigger>
				<Button color="primary">Create a Post</Button>
			</PopoverTrigger>
			<PopoverContent>
				<form className="p-4" onSubmit={handleSubmit} noValidate>
					<div className="flex flex-col gap-4 p-4 w-80">
						<h3 className="text-lg font-semibold mb-2">Create a Post</h3>
						<Input name="title" label="Title" labelPlacement="outside" placeholder="Enter post title" required isInvalid={!!formState?.errors?.title} errorMessage={formState?.errors?.title?.join(", ")} />
						<Textarea name="content" label="Content" labelPlacement="outside" placeholder="Enter post content" required isInvalid={!!formState?.errors?.content} errorMessage={formState?.errors?.content?.join(", ")} />
						{formState?.errors?._form ? <div className="rounded p-2 bg-red-200 border border-red-400">{formState?.errors?._form?.join(", ")}</div> : null}
						<FormButton isLoading={isPending}>
							Submit
						</FormButton>
					</div>
				</form>
			</PopoverContent>
		</Popover>
	);
}