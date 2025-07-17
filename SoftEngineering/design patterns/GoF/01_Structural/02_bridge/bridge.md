# Bridge - TODO: REVIEW
Very similar to Adapter but is designed to work with new code, while the Adapter is designed to work with Legacy code.

## Concepts
- Meant to DECOUPLE ABSTRACTION AND IMPLEMENTATION
    - For that it uses: 
        - Encapsulation
        - Composition
        - Inheritance
        
- Key concept and difference with plain inheritance is:
    
    - Changes in the abstraction won't affect the client. The Client is unaware of the abstraction on the back end.
    
    - This is important becasue this decouples the implementation from the contract or interface that the client is using.
    
- One of the key reason to use this pattern is that we know that the DETAILS OF IMPLEMENTATION WONT BE RIGHT
    - It allows for a level of indirection that we add into our application.
    - If you are not sure of what the end product of what you are building will be, the Bridge is great for giving us flexibility without breaking things when changed.
    
- Exaples:

    - A Driver, the Bridge is in many ways, just a Driver
        - Java API -> JDBC drivers: We have an Interface that we work with, and a driver that works with the underlying DB
        
## Design

- It uses Interfaces and Abstract classes

- Composition over Inheritance, but it is more than just Composition

- Your app is designed to expect change on both sides

- The elements of the Pattern are:

    - **Abstraction**: Interface -> 

    - **Implementor**: Abstract Class -> 
    
    - **Refined Abstraction**: Interface -> refined version of the Abstraction, just a more specific impl of that interface
    
    - **Concrete Implementor**: Class -> COncrete impl that will utilize COMPOSITION of our varoius pieces of our bridge pattern to define those concrete impls.
         
## Example
**JDBC**

JDBC is an interface API for executing SQL statements.

- Classes that implement the interface are JDBC drivers

- Application that rely on these drivers are **Abstractions** that can work with any DB for which JDBC driver exists

- The JDBC architecture decouples an abstraction from its impl so that the two can vary independently

        DriverManager.registerDriver(new org.apache.derby.jdbc.EmbeddedDriver());
		
        String dbUrl = "jdbc:derby:memory:codejava/webdb:create=true";
		
        Connection conn = DriverManager.getConnection(dbUrl);
		
        Statement sta = conn.createStatement();

## Exercise - Create Bridge
Color and Shape
Color and Shape Bridge

### Shape with inheritance (without a bridge)
We have colored shapes that inherit from Shape.

Each subclass implements a color.

For every new shape with color, I have to create a class that implements the apllycolor and inherits form the shape I want.

And for every new shape I ahve to crate the shape, and create all the shaped colors for that shape.

### Shape with a bridge

Now Color is extracted into an interface, which is inheriter by implementations of color (Blue, Brown, etc.)
- We use now composition
Shape, has a variable called color, that is the way we replace inheritance with composition.

Main

    Color green = new Green();
		
    Shape greenCircle = new Circle(green);

Color

    public interface Color {

        public void applyColor();

    }

Green

    public class Green implements Color {

        @Override
        public void applyColor() {
            System.out.println("Applying green color");
        }

    }

Shape

    public abstract class Shape {

        protected Color color;

        public Shape(Color color) {
            this.color = color;
        }

        abstract public void applyColor();
    }

Circle

    public class Circle extends Shape {

        public Circle(Color color) {
            super(color);
        }

        @Override
        public void applyColor() {
            color.applyColor();
        }

    }
    
the Bridge is the way we are utilizing that composition and extracting out the properties on this.

We have something on one side, the Shape, and something on the other side, the Color, and we want them to be independent of each other in terms of changes, using composition and abstraction we solve that.

**In this way, we ar eable to add a Shape or a Color without having to change the other side**

To do that we mananged the Color to be and **Interface** and provide a contract to the Shape, this interfae was **composed** into the Shape, not inherited. Now one side of the app, the Shape, uses a API which can change its implementation independently from the user / caller / client

## Exercise - Movie Printer Bridge

We have a Movie POJO with movie attributes.
There is a Detail class used to pass info between the Bridge pieces.

Then we have a Formatter INTERFACE (**Abstraction**)

    public interface Formatter {
        String format(String header, List<Detail> details);
    }
    
And the Printer ABSTRACT CLASS (**Implementor**), as any of our specific printers will implement it (**ConcreteImplementor**)

    public abstract class Printer {

        public String print(Formatter formatter) {
            return formatter.format(getHeader(), getDetails());
        }

        abstract protected List<Detail> getDetails();

        abstract protected String getHeader();
    }
    
One side of the Bridge:
    
- **Printer** *Abstract Class* with the **MoviePrinter** impl.
    - The movie printer uses *Composition*
    
Other side of the Bridge
- **Formatter** *Interface* wiht it's implementation **PrintFormatter** and **HTMLFormatter**


# Pitfalls

- Increases complexity, you need to look at the code and see what makes sense to abstract out
- It can be conceptually difficult to plan, your code has to be fairly thought out, and it might not lend itself to go into an agile code-as-you-go scenario.
- It is definitely more than just OO principles
- And can be a little confusing of what goes where in your code

# Contrast: Bridge vs Adapter

Bridge
- Designed and built upfront, we already know what we want to do when coding our app.
- Anstraction and impl vary, we can change the sides without breaking the other
- More complex

Adapter
- Works after code is designed
- Intended for LEgacy code, to tie it with new apps
- Just provides an interface to our Legacy code
- WE dont want ot break functionality apart to work independently form one another like the Bridge

# Summary
- Designed for uncertainty
- Can be complex
- Provides flexibility (for the price of complexity)
- More than composition. It uses composition, inheritance thourgh abstractions and interfaces