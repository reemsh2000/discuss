import { Input, Button, Textarea, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import * as actions from "@/actions";
export default function TopicCreateForm() {
	return (
		<Popover placement="left">
			<PopoverTrigger>
				<Button color="primary">Create Topic</Button>
			</PopoverTrigger>
			<PopoverContent>
				<form className="p-4" action={actions.createTopic}>
					<div className="flex flex-col gap-4 p-4 w-80">
						<h3 className="text-lg font-semibold mb-2">Create a New Topic</h3>
						<Input name="title" label="Title" labelPlacement="outside" placeholder="Enter topic title" required />
						<Textarea name="description" label="Description" labelPlacement="outside" placeholder="Enter topic description" required />
						<Button type="submit" className="mt-4">
							Submit
						</Button>
					</div>
				</form>
			</PopoverContent>
		</Popover>
	);
}
