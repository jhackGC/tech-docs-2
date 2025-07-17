# Decorator - Intro
Hierarchical  type pattern that builds functionality at each level while using composition from similar data types.

# Concepts

- A.K.A. Wrapper. Used when you want ot add behavior to an object, without affecting other parts of the hierarchy if you dont want to.

- More that simple inheritance
    - you control which pieces complement your object, not bnecessarily trying to override it like with inheritance

- Follow s the SINGLE RESPONSIBILITY PRINCIPLE
    - Every class should have responsibility over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by the class.
    - Should do one thing and shouldo it well

- You can compose behavior DINAMICALLY
    - by using one of the subclasses that decorate your object
    
- Examples:
    - java.io.InputStream
    - almost all UI components in AWT and Swing APIs are implemented wiht this DP
    
# Design

- Inheritance based, but utilizes composition and inheritance (is-a, has-a) to achieve it.
    - There is a common component but functionality is added in the subcomponents

- Alternative to subclassing, as it adheres to the SINGLE RESPONSIBILITY PRINCIPLE, that we talked about in the concepts section, where this class will do just one thing.
    - tipically when you subclass , it is to completely rewrite or extends the parent class

- The CONSTRUCTOR requires instance of the component from hierarchy
    - Which enables it to build upon that and use composition rather that inheritance to override the fields that it wants to.
    
- The pieces of the UML are
    - Component: Interface or Abstract class
    - Concrete Component: What is being decorated
    - Decorator: Base or Wrapper decorator
    - ConcreteDecorator: Multiple impls that provide functionality as we develop.
    
    **Note that the Concrete Component and the Decorator extend the Component API so they can be TREATED THE SAME**


# Example: InputStream

**In the java.io decorators are heavily used, so they can daisy chain functionality on to different streams WIHTOUT HAVING TO HAVE A SPECIFIC INSTANCE OF EACH CLASS TO BUILD THAT OUT.**

The OutputStream alone cant write a file, the FileOutputStream does, but the FileOuputStream doesnt know about writing out data, so the DataOutputSrtream goes through the FileOuputStreamm which goes through the OutputStream.

So this kind of reverse hierarchy is being built using the structural decorator pattern.

OutputStream is a base decorator, we can add on to its functionality using a FileOutputStream and a DataOutputStream.
They chain together, appending its functionality on.

FileOutputStream is an instance of a concrete decorator

Then we pass that FileOutputStream into a DataOutputStream

    public class DecoratorEverydayDemo {

        public static void main(String args []) throws Exception {
            File file = new File("./output.txt");
            file.createNewFile();

            OutputStream oStream = new FileOutputStream(file);

            DataOutputStream doStream = new DataOutputStream(oStream);
            doStream.writeChars("text");

            doStream.close();
            oStream.close();
        }
    }

# Example: Create Decorator
Hierarchy that build a sandwich.

Pattern parts

- Component: Sandwich < I >
- ConcreteComponent: SimpleSandwich Class, implements Sandwich < I > 

- Decorator: SandwichDecorator abstract Class, implements Sandwich < I >
    - Has a protected instance that can be either:
        - the Concrete Component (SimpleSandwich)
        - Or it can be the the instance of another decorator
    
- Concrete Decorator: 
    - Constructorreceives a concrete component/component interface
    - Implements the operation(), may add functionality to it.
    - e.g.
        - MeatDecorator, that extends the SandwichDecorator, and may have own functionality (add meat).
        - DressingDecorator, that extends the SandwichDecorator, and may have own functionality. (add dressing)
    
We dont have to create new instances of SimpleSandwich every time we want to change up what type of class we have.

Its the same as the I/O packages are doing using InputStrea, inside of the java.io API.


Main

    public static void main(String args[]) {
		Sandwich sandwich = new DressingDecorator(new MeatDecorator(new SimpleSandwich()));
		
		System.out.println(sandwich.make());
	}
    
Sandwich

    public interface Sandwich {
        public String make();
    }
    
SimpleSandwich

    public class SimpleSandwich implements Sandwich {
        @Override
        public String make() {
            return "Bread";
        }
    }

SandwichDecorator

    public abstract class SandwichDecorator implements Sandwich {

        protected Sandwich customSandwich;

        public SandwichDecorator(Sandwich customSandwich) {
            this.customSandwich = customSandwich;
        }

        public String make() {
            return customSandwich.make();
        }

    }

MeatDecorator

    public class MeatDecorator extends SandwichDecorator {

        public MeatDecorator(Sandwich customSandwich) {
            super(customSandwich);
        }

        public String make() {
            return customSandwich.make() + addMeat();
        }

        private String addMeat() {
            return " + turkey";
        }
    }


# Pitfalls
- You end up building a new class for every feature that you want to decorate
    - Realize that the decorator enables us to not need to extend the concrete object, but rather implement a new decorator itself.
    - The side effect of this though is that you end up with a lot of little specialized objects. 

- Decorators can also be confused with simple inheritance

# Benefits
Decorators give us a unique way to add functionality without creating concrete objects for every feature we want to implement.

We'd rather create a decorator and don't mess up that hierarchy of our concrete objects

# Decorator vs Composite

**Composite**
- Tree structure
- Intent is to make a LEAF and a COMPOSITE to have the SAME INTERFACE to the client.
- Unity between objects

**Decorator**
- Contains another entity (Composition)
- Modifies the behavior of the contained object (adds), not change it
- Does NOT CHANGE the underlying object
 
 
# Summary
- Original object stays the same
    - We dont have to create concrete objects to add functionality to them, we use the decorator for that
    - Unique way to add functionality
    - Confised with inheritance
        - Inheritance is used for the DP, but we don't have to change our base object
    - Can be more complex to our clients, exposes a lot of its functionality.