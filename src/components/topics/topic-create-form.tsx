"use client";
import { Input, Button, Textarea, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import * as actions from "@/actions";
// import { useFormState } from "react-dom";
import { useActionState, startTransition } from "react";
import FormButton from "@/components/common/form-button";

export default function TopicCreateForm() {
	const [formState, action, isPending] = useActionState(actions.createTopic, {
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
				<Button color="primary">Create Topic</Button>
			</PopoverTrigger>
			<PopoverContent>
				<form className="p-4" onSubmit={handleSubmit} noValidate>
					<div className="flex flex-col gap-4 p-4 w-80">
						<h3 className="text-lg font-semibold mb-2">Create a New Topic</h3>
						<Input name="title" label="Title" labelPlacement="outside" placeholder="Enter topic title" required isInvalid={!!formState?.errors?.title} errorMessage={formState?.errors?.title?.join(", ")} />
						<Textarea name="description" label="Description" labelPlacement="outside" placeholder="Enter topic description" required isInvalid={!!formState?.errors?.description} errorMessage={formState?.errors?.description?.join(", ")} />
						{formState?.errors?._form ? <div className="rounded p-2 bg-red-200 border border-red-400">{formState?.errors?._form?.join(", ")}</div> : null}
						<FormButton isLoading={isPending}>Submit</FormButton>
					</div>
				</form>
			</PopoverContent>
		</Popover>
	);
}
