# Server Actions for Authentication and Form Validation

Is a server function that is called on the server but usually initiated by an interaction, its like an API route, but with a cleaner syntax.

**_A streamliner way to create API routes._**
You want cross the network boundary, you want to go from client to server,you want to post some data or update or retrieve.

You are using a HTTP request, cookies, etc, its the same as a API route, but you dont have to write the code ...

With SA, there is some data being sent to the server, you are just not responsible for doing that. ()

Server Actions, also known as server functions, are a React feature enabling client components to call asynchronous functions directly on the server.

They are especially powerful within React Server Components (RSCs), particularly for form handling.

Consider them streamlined API endpoints for your application, offering a more integrated and efficient way to manage server-side logic.

For more in-depth information, consult the official [Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) and [React](https://react.dev/reference/rsc/server-functions) documentation.

## Auth Server Functions

NodeJS server functions, they have not access to window, DOM, etc, like any other NodeJS function, but they can access the request and response objects, as well as server env variables, databases, etc.

The NextJS compiler will separate the modules in client and server.

By using "use server" all the actions exported from this file will be like API routes, the compiler will create an API route for each action, but it's "obfuscated" from you.
And when the action (route) is called it will run the function it exports a HTTP request still happens but you are not responsible to handle it, just the function.

If you dont use "use server" this module will just export functions that you can call directly
it will not be an API route, it will just be a module that you can import and use in your components
"use server" is being using like a decorator for NextJS to create routes for those actions.

```ts
//....
"use server";

import {
  createSession,
  createUser,
  deleteSession,
  verifyPassword,
} from "@/lib/auth";
import { getUserByEmail } from "@/lib/dal";
import { redirect } from "next/navigation";
import { z } from "zod";

// Define Zod schema for signin validation
const SignInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// Define Zod schema for signup validation
const SignUpSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignInData = z.infer<typeof SignInSchema>;
export type SignUpData = z.infer<typeof SignUpSchema>;

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};

export const signin = async (formData: FormData): Promise<ActionResponse> => {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validationResult = SignInSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const user = await getUserByEmail();

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
        errors: {
          email: ["Invalid email or password"],
        },
      };
    }

    const isPasswordValid = await verifyPassword(data.password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password",
        errors: {
          password: ["Invalid email or password"],
        },
      };
    }

    await createSession(user.id);

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Something bad happended",
      message: "Something bad happended",
    };
  }
};

export const signup = async (formData: FormData) => {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword"),
    };

    const validationResult = SignUpSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation faild",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      return {
        success: false,
        message: "Nah",
        errors: ["Stop trying to spoof me"],
      };
    }

    const user = await createUser(data.email, data.password);

    if (!user) {
      return {
        success: false,
        message: "try again",
        errors: ["account could not be created"],
      };
    }

    await createSession(user.id);

    return {
      success: true,
      message: "Account created",
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "something bad happened",
    };
  }
};

export const signOut = async () => {
  try {
    await deleteSession();
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    redirect("/signin");
  }
};
```

# Calling those functions (routes) from outside your NextJS app.

You can't, you wouldn't know how to call them as the api routes are created on the fly by the compiler, you can only call them from within your NextJS app, from a client component or a server component.

For example if we submit a form in the '/signin' page, the form will POST to the 'signin' route, it's not calling any AJAX endpoint, its just HTML5 default behavior.

Do not confuse this POST request with the actual POST request to the server action/route, this is just a form POST request, meaning that if you call any action on a form it will do a POST to the same page. In other words the POST /signup is the form submission, not the action call.
That is just how forms work in HTML5, when you submit a form it does a POST request to the same page by default.

But if you call a server action outside of a form, you will not see any which API route it is using, as NectJS just creates one on the fly/compile time.
