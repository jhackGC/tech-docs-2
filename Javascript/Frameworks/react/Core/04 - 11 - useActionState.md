## useActionState

https://react.dev/reference/react/useActionState

seActionState is a Hook that allows you to update state based on the result of a form action.

When you import the action method into the front end component, you import the HANDLER for that API route, not the code itself.

So when that function gets called, it makes a network request.

We create the handlers with the useActionState hook, which is a React hook that allows you to manage the state of an action in a form.

Then we use the formAction handler for the form action submission so it executes the useActionState callback logic (call the action)

Note that there is no controlled inputs in the form, we don't need them as they are handled by the useActionState hook.

```typescript
"use client";
// we are using client components to render the signup page as we are going to use hooks in it
// and form / interaction.

import Link from "next/link";

// navigate programatically with useRouter
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
// we are only importing the action method ("signUp"), not the code itself
// so when that function gets called, it makes a network request.
import { ActionResponse, signUp } from "../../../actions/auth";
import Button from "../../../components/ui/Button";
import {
  Form,
  FormError,
  FormGroup,
  FormInput,
  FormLabel,
} from "../../../components/ui/Form";

const intialState: ActionResponse = {
  success: false,
  message: "",
  error: undefined,
};

export default function SignUpPage() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signUp(formData);

      if (result.success) {
        toast.success("Account created successfully");
        router.push("/dashboard");
      }

      return result;
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || "An error occurred",
        errors: undefined,
      };
    }
  }, intialState);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#121212]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Mode
        </h1>
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Create a new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Form action={formAction} className="space-y-6">
          {state?.message && !state.success && (
            <FormError>{state.message}</FormError>
          )}

          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isPending}
              aria-describedby="email-error"
              className={state?.errors?.email ? "border-red-500" : ""}
            />
            {state?.errors?.email && (
              <p id="email-error" className="text-sm text-red-500">
                {state.errors.email[0]}
              </p>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              disabled={isPending}
              aria-describedby="password-error"
              className={state?.errors?.password ? "border-red-500" : ""}
            />
            {state?.errors?.password && (
              <p id="password-error" className="text-sm text-red-500">
                {state.errors.password[0]}
              </p>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              disabled={isPending}
              aria-describedby="confirmPassword-error"
              className={state?.errors?.confirmPassword ? "border-red-500" : ""}
            />
            {state?.errors?.confirmPassword && (
              <p id="confirmPassword-error" className="text-sm text-red-500">
                {state.errors.confirmPassword[0]}
              </p>
            )}
          </FormGroup>

          <div>
            <Button type="submit" className="w-full" isLoading={isPending}>
              Sign up
            </Button>
          </div>
        </Form>
        <div className="bg-white dark:bg-[#1A1A1A] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 dark:border-dark-border-subtle">
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Sign Up",
  description: "Create a new account",
};
```

When you submit the form, a network request will be done to

POST /signup

Do not confuse this POST request with the actual POST request to the server action, this is just. a form POST request, meaning that if you call any action on a form it will do a POST to the same page. In other words the POST /signup is the form submission, not the action call.
That is just how forms work in HTML, when you submit a form it does a POST request to the same page by default.

For example if we submit a form in the '/signin' page, the form will POST to the 'signin' route, it's not calling any AJAX endpoint, its just HTML5 default behavior.

Another thing, the form is uncontrolled, if the server validation fails, the values are lost on re-render, e.g. if the validation for the password fails in the server side, you lose the value of the email
