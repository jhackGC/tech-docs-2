# Typescript

https://github.com/mike-north/professional-ts/

# Custom types

## Interface and Classes can be used to create

Interface and Classes can both be used to create custom types in TS.

Interfaces

- Define a new type
- Have props (only the signatures: name and type)
- Have methods (only the signatures: name, param types and return type)
- Cant be instantiated, they are a contract.
- Can be extended or inherited

        interface Employee {
            name: string;
            title: string;
        }

        interface Manager extends {
            department: string;
            numOfEmployees: number;

        }

Object that can be assigned to any variable that is declared as Employee interface

A.K.A. DUCK TYPING

    let developer = {
            name: 'Michele',
            title: 'Senior Dev',
            editor: 'WebStorm'
        } // literal object that complies with Employee interface type (and has extra fields), will match the structure, even if it has not beebn declared as of that type

    let newEmployee: Employee;
    newEmployee = developer; // structural match

Classes

- Define a new type
- Have props (with implementation: custom accessor functions, getters and setters)
- Have methods (with implementation: name, param types and return type)
- Can be instantiated, called objects
