# Creating New Issues with Server Actions

**_Remember server components are regular NodeJS code, regular functions, they don't behave like React components, they are just functions that return JSX._**

As regular functions they dont re run trigerred by state/props changes like client components, they are just functions , and as such they can be **_async_** and use closures, etc. See below

```ts
export async function createIssue(data: IssueData): Promise<ActionResponse> {
  // Security check - ensure user is authenticated
  const user = await getCurrentUser();
}
```

We now want to create an element (e.g. an issue). We will use server actions for this.

/lib/actions/issues.ts

```ts
"use server";

import { db } from "@/db";
import { issues } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/dal";
import { z } from "zod";

// Define Zod schema for issue validation
const IssueSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),

  description: z.string().optional().nullable(),

  status: z.enum(["backlog", "todo", "in_progress", "done"], {
    errorMap: () => ({ message: "Please select a valid status" }),
  }),

  priority: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Please select a valid priority" }),
  }),
  userId: z.string().min(1, "User ID is required"),
});

export type IssueData = z.infer<typeof IssueSchema>;

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};

export async function createIssue(data: IssueData): Promise<ActionResponse> {
  try {
    // Security check - ensure user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: "Unauthorized access",
        error: "Unauthorized",
      };
    }

    // Validate with Zod
    const validationResult = IssueSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Create issue with validated data
    const validatedData = validationResult.data;
    await db.insert(issues).values({
      title: validatedData.title,
      description: validatedData.description || null,
      status: validatedData.status,
      priority: validatedData.priority,
      userId: validatedData.userId,
    });

    return { success: true, message: "Issue created successfully" };
  } catch (error) {
    console.error("Error creating issue:", error);
    return {
      success: false,
      message: "An error occurred while creating the issue",
      error: "Failed to create issue",
    };
  }
}

export async function updateIssue() {}
```

/app/issues/new/page.tsx

```tsx
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import NewIssue from "@/app/components/NewIssue";

export default async function NewIssuePage() {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-6"
      >
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold mb-6">Create New Issue</h1>

      <div className="bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border-default rounded-lg shadow-sm p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <NewIssue />
        </Suspense>
      </div>
    </div>
  );
}
```

/app/components/NewIssue.tsx

```tsx
import { redirect } from "next/navigation";
import IssueForm from "./IssueForm";
import { getCurrentUser } from "@/lib/dal";

const NewIssue = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

  return <IssueForm userId={user.id} />;
};

export default NewIssue;
```

```tsx
"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Issue, ISSUE_STATUS, ISSUE_PRIORITY } from "@/db/schema";
import Button from "./ui/Button";
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormError,
} from "./ui/Form";
import { createIssue, ActionResponse } from "@/app/actions/issues";

interface IssueFormProps {
  issue?: Issue;
  userId: string;
  isEditing?: boolean;
}

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

export default function IssueForm({
  issue,
  userId,
  isEditing = false,
}: IssueFormProps) {
  const router = useRouter();

  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    // Extract data from form
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as
        | "backlog"
        | "todo"
        | "in_progress"
        | "done",
      priority: formData.get("priority") as "low" | "medium" | "high",
      userId,
    };

    try {
      // Call the appropriate action based on whether we're editing or creating
      const result = isEditing
        ? await updateIssue(Number(issue!.id), data)
        : await createIssue(data);

      // Handle successful submission
      if (result.success) {
        router.refresh();
        if (!isEditing) {
          router.push("/dashboard");
        }
      }

      return result;
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || "An error occurred",
        errors: undefined,
      };
    }
  }, initialState);

  const statusOptions = Object.values(ISSUE_STATUS).map(({ label, value }) => ({
    label,
    value,
  }));

  const priorityOptions = Object.values(ISSUE_PRIORITY).map(
    ({ label, value }) => ({
      label,
      value,
    })
  );

  return (
    <Form action={formAction}>
      {state?.message && (
        <FormError
          className={`mb-4 ${
            state.success ? "bg-green-100 text-green-800 border-green-300" : ""
          }`}
        >
          {state.message}
        </FormError>
      )}

      <FormGroup>
        <FormLabel htmlFor="title">Title</FormLabel>
        <FormInput
          id="title"
          name="title"
          placeholder="Issue title"
          defaultValue={issue?.title || ""}
          required
          minLength={3}
          maxLength={100}
          disabled={isPending}
          aria-describedby="title-error"
          className={state?.errors?.title ? "border-red-500" : ""}
        />
        {state?.errors?.title && (
          <p id="title-error" className="text-sm text-red-500">
            {state.errors.title[0]}
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="description">Description</FormLabel>
        <FormTextarea
          id="description"
          name="description"
          placeholder="Describe the issue..."
          rows={4}
          defaultValue={issue?.description || ""}
          disabled={isPending}
          aria-describedby="description-error"
          className={state?.errors?.description ? "border-red-500" : ""}
        />
        {state?.errors?.description && (
          <p id="description-error" className="text-sm text-red-500">
            {state.errors.description[0]}
          </p>
        )}
      </FormGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormGroup>
          <FormLabel htmlFor="status">Status</FormLabel>
          <FormSelect
            id="status"
            name="status"
            defaultValue={issue?.status || "backlog"}
            options={statusOptions}
            disabled={isPending}
            required
            aria-describedby="status-error"
            className={state?.errors?.status ? "border-red-500" : ""}
          />
          {state?.errors?.status && (
            <p id="status-error" className="text-sm text-red-500">
              {state.errors.status[0]}
            </p>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="priority">Priority</FormLabel>
          <FormSelect
            id="priority"
            name="priority"
            defaultValue={issue?.priority || "medium"}
            options={priorityOptions}
            disabled={isPending}
            required
            aria-describedby="priority-error"
            className={state?.errors?.priority ? "border-red-500" : ""}
          />
          {state?.errors?.priority && (
            <p id="priority-error" className="text-sm text-red-500">
              {state.errors.priority[0]}
            </p>
          )}
        </FormGroup>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isPending}>
          {isEditing ? "Update Issue" : "Create Issue"}
        </Button>
      </div>
    </Form>
  );
}
```

# cacheComponents (previously known as Dynamic I/O)

Backstory: Caching in NextJS 13 to 15 was ON by default, in many different places, at the router level, data level, everywhere, by default.

So things were happening that you didn't think were happening on your page, as the philosophy was "fast by default", they cached everything for you.
But people didn't like that, they didn't want all cached by default, as it created many issues.

So in NextJS they will change that, now caching is OFF by default, and you have to enable it explicitly. Pick what's dynamic and what is cached, and a third option which is partial or hybrid.

**_'use cache' as a directive is just NNextJS , React does not have that directive._**

See
https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents

https://nextjs.org/docs/app/api-reference/config/next-config-js/useCache

If you want to cache a component, you can use the `use cache` directive, which is a NextJS specific feature.

If you want your component to be dynamic, you wrap your component in a `<Suspense>` boundary, and it will not be cached. NextJs will not cache it.

```tsx

import { Suspense } from "react";

  async function Component() {
    // Fetch some data
    return fetch(...) // no error
  }


export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}
```
