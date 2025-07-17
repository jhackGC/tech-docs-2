---
title: Abstract Factory Pattern
layout: default
---

# Abstract Factory Pattern

## Executing files form the command line with the "java" command

- Remember to use the full class name including the package name ...
- To do it you need to be in the root compiled dir and use a full path class name to execute it.

> /dist/com/company/Main.class

> $ cd /dist

> java com.company.Main

- To avoid using the full path name you need to setup the CLASSPATH env variable
- On windows, in order to access the java command, you must include JRE bin folder in Path environment variable

## Java syntax

### Statement structure and white spaces

- Are made of statements
- Statements ends with a semicolon
- Stat. parts separated by zero or more:
  - whitespaces
  - tabs
  - new lines

### Comments

Add notes to the source code and hide statements from the compiler.

    // line comments


    /* Block comments, they can not be nested but I can put // line comments */


    /**
     * JavaDoc comments, useful for automatic doc generation.
     */


### Packages

Provides organization for java programs:

- Packages provide organization
- Follow standard naming
- Affect source code file structure

#### naming conventions

- all lowercase - mandatory
- use reversed domain name to assure global uniqueness - opt
- add further qualifiers to assure uniqueness within a company/group

When you put members inside of a package those members become part of it,
and the package becomes part of their name.

#### file structure

Java requires no correlation between package names and source code file structure
Java does not force you to put your file in a directory structure equals to
the java file qualified name.
But most IDEs will do require a subfolder for each part of the package name
So, in practice most of your tools, will require that your source file structure match up
your java source file package name.

### Variables

Named data storage. Java is a strong typed language, meaning tha twhen we decalre a variable we have to
put its type.
Variables can be declared and initialized in same or diff lines

    int foo;
    foo = 100;

    int foo = 100;

Values can be modified

#### Naming variables

- Rules
  - allow the use of:
    - letters
    - numbers
    - $ (money symbol)
    - \_ (underscore)
  - First character IS NOT a number
- Convention
  - only letters and numbers
  - start with a letter
  - camelCase

    int total
    int $pou
        int _defwoi$

### Primitive data types

Built into the language
Foundation of all other types

Categories

- Integer
  - byte: 8 bits / minval: -128 / max val: 127 / literal format: 0
  - short: 16 bits / minval: -32768 / max val: 32767 / literal format: 0
  - int: 32 bits / minval: -2147483648 / max val: 2147483647 / literal format: 0
  - long: 64 bits / minval: -9223372036854775808 / max val: 9223372036854775807 / literal format: 0L
- Floating point (fractional part or decimal numbers)

  - float: 32 bits / minval: 1.4x10^-45 / max val: 3.4x10^38 / literal format: 0.0f
  - double: 64 bits / minval: 4.9x10^-324 / max val: 1.7x10^308 / literal format: 0.0 or 0.0d

  //literals
  byte aByte = 34;
  short aShort = 34435;
  int anInt = 324254554;
  long aLong = 32425454554354L;

  float aFloat = 3242545455.4354f;

  double aDouble = 324254545.54354d;
  or
  double aDouble = 324254545.54354;

- Character
  - char: Stores a single UNICDE character. Literals are placed between SINGLE quotes.
  char letter = 'a';
  char accentedU_Unicode = '\u00DA'; // U with stress
- Boolean
  Store true/false values. And its literals are true and false
  bool a = true;

#### Primitives types are stored by VALUE

Each primitive type variable has its own separate copy of the data.

### Arithmetic operators

#### Basic operators

    - + Add
        -
    - - Substract
    - * Multiply
    - / Divide
    - % Modulus

#### Prefix and postfix operators

#### Compound assignment operators
