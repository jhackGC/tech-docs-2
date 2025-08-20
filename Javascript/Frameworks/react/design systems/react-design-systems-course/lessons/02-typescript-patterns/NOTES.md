
what do keyof anf typeof do?

In TypeScript:

typeof gets the type of a variable or object (at the type level). For example, typeof colors gives you the type of the colors object.

keyof gets a union of all the keys of a type or object. 

For example, keyof typeof colors gives you a type that is all the keys of the colors object ("primary" | "secondary" | "success" | "warning" | "error" | "neutral").

Together, they let you create types based on the structure of existing objects.