# Abstraction
The cornerstone of OOP
Abstraction in computer programming is a way to reduce complexity and allow efficient design and implementation in complex
 software systems. It hides the technical complexity of systems behind simpler APIs.
The conjunction of an object's complex inheritance, methods, and properties must adequately reflect a reality model.

# Encapsulation
A method of bundling the data and methods that use the data.
The class controls access and makes a "blackbox" out of the object. Because of this, a user of that class only needs
to know its interface (that is, the data and functions exposed outside the class), not the hidden implementation.


# Modularity
The term Modularity refers to the degree to which a system's components may be separated and recombined, it is also
division of a software package into logical units. The advantage of a modular system is that one can reason the parts
independently

# Inheritance - Code reuse
Inheritance is the design technique which implements a 'is-a' relationship between objects.
Inheritance in Java is implemented using extends keyword.
A class can inherit characteristics from another class.
- Single Inheritance.
- Multiple Inheritance (Through Interface) (Java)

# Composition - Code reuse


Inheritance is a reusability mechanism in OOP. The common properties of various objects are exploited to form relationships with each other. The abstract and common properties are provided in the superclass , which is available to the more specialized subclasses.

For example, a color printer and a black-and-white printer are kinds of a printer (single inheritance); an all-in-one printer is a printer, scanner, and photocopier (multiple inheritance).

Object composition

Individual abstractions offer certain functionalities that need to be combined with other objects to represent a bigger abstraction: a composite object that is made up of other smaller objects. You need to make such composite objects to solve real-life programming problems. In such cases, the composite object shares HAS-A relationships with the containing objects, and the underlying concept is referred to as object composition.

By way of analogy, a computer is a composite object containing other objects such as CPU, memory, and a hard disk. In other words, the computer object shares a HAS-A relationship with other objects.

Composition vs. Inheritance

In some situations, it’s difficult to choose between the two. It’s important to remember
that nothing is a silver bullet—you cannot solve all problems with one construct. You need to analyze each situation carefully and decide which construct is best suited for it.

    A rule of thumb is to use HAS-A and IS-A phrases for composition and inheritance, respectively. For instance,

A computer HAS-A CPU.
A circle IS-A shape.
A circle HAS-A point.
A laptop IS-A computer.
A vector IS-A list.

    This rule can be useful for identifying wrong relationships. For instance, the relationship of car IS-A tireis completely wrong, which means you cannot have an inheritance relationship between the classes Car and Tire . However, the car HAS-A tire (meaning car has one or more tires) relationship is correct—you can compose a Car object containing Tire objects.

    In real scenarios, the relationship distinctions can be nontrivial. Many people ignore a big cautionsign suspended over this practice—always check whether the IS-A relationship exists between the derived classes and the base class. If the IS-A relationship does not hold, it’s better to use composition instead of inheritance.





## Composition vs Inheritance

Both composition and inheritance promotes code reuse through different approaches.
Reasons that will help you in choosing composition vs inheritance.

- Inheritance is tightly coupled whereas composition is loosely coupled.


# Polimorphism
Polymorphism is the presentation of one interface for multiple data types.
Different classes might define the same method or property.
The capacity of a programming language to provide the same method call and different behavior based on the claa type.
Tha is possible thanks to encapsulation




# Namespace
A container which lets developers bundle all functionality under a unique, application-specific name.

# Class
Defines the object's characteristics. A class is a template definition of an object's properties and methods.

# Object
An instance of a class

# Property
An object characteristic

# Method
An object capability, behaviour. It is a subroutine or function associated with a class.

# Constructor
A method called at the moment an object is instantiated. It usually has the same name as the class containing it.
