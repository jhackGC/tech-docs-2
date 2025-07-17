# Flyweight - Intro
Minimizes memory use by sharing data with similarly typed objects

# Concepts
You may use it when:
- You need to make  a more efficient use of memory
- It is an optimization pattern
- It is tipically an issue when you have a large number of similar objects
- It is the case for objects that are stateless or immutable in nature
    - Immutable objects: their state cant be changed after creation
    - this is possibe when most of the object state can be extrinsic ( not essential or inherent)
- Examples:
    - java.lang.String
    Strings are immutable objects and are loaded from a string literal poolthat is the flyweight factory
    - Caching is a signal that you could be using or are using the flyweight DP as well.
    - java.lang.Integer valueOf method.
    - All the primitives Wrappers such as Boolean, Byte, Character, Short, Long have a valueOf() method that is similar to the Integer's which is a flyweight DP.
    
# Design
A bit more complicated

- It is a pattern of patterns
    - Uses a Factory DP to retrieve flyweight objects after they have been created
    - It covers, structure and creation, so it has a Creational pattern inside of it

- Pieces of the UML diagram
    - Client
    - Factory
    - Flyweight
    - ConcreteFlyweight
    
        - The Client requests the Flyweight object (many times it doesnt know it is a flyweight)
        - It requests it from the Flyweight factory
        - Factory returns the cached object or creates a new instance.
        - The ConcreteFlyweight is in the end, what is returned to the client, although it thinks it's just getting that object back.
        - Many times the Client doesn't knnow the underlying structure and just has a simple interface
        
# Example - java.lang.String
Strings literals are immutable and come out of the String literal pool.
The literal pool is a sort of cache that all literal strings in the JVM are stored and retrieved from.
When the same string literal is created more than once, only one copy of each distinct string value is stored. This is called "string interning" and the memory area used to store them is not the Heap, for objects, is called the Method Area.

		String first = "pepe";
		String second = "pepe";

		System.out.println(first == second);

		System.out.println(System.identityHashCode(first));
		System.out.println(System.identityHashCode(second));
        
        //object references to Strings are stored in the Heap, and are !=
        String c = new String("abcd");
		String d = new String("abcd");
		System.out.println(c == d);  // False
		System.out.println(c.equals(d)); // True

# Example - java.lang.Integer
All other object Wrappers like Integer use the DP.
the valueOf method looks for an Integer previously created, if not found, creates it, and returns it.
From then on all other calls will get the same object.

    public static void main(String args[]) throws Exception {
		
		Integer firstInt = Integer.valueOf(5); // looks up, if not exists creates, and return
		
		Integer secondInt = Integer.valueOf(5); // already exists, brings back previous object
		
		Integer thirdInt = Integer.valueOf(10);
		
		System.out.println(System.identityHashCode(firstInt));
		System.out.println(System.identityHashCode(secondInt));
		System.out.println(System.identityHashCode(thirdInt));
	
	}
    
# Demo - Inventory system
- Client
- Catalog
- Order
- Item - ConcreteFlyweight


    - Factory
    - Flyweight


Item : implementation of the Flyweight
Everything in this class is IMMUTABLE, no getters or setters, fields are final. That allows us to pass that instance around.

    //Instances of Item will be the Flyweights
    class Item {
        private final String name;

        public Item(String name) {
            this.name = name;
        }

        public String toString() {
            return name;
        }
    }

Order
App related, the Order clas has nothing to do with th DP itself.
It consumes Items

    public class Order {
        private final int orderNumber;
        private final Item item;

        Order(int orderNumber, Item item) {
            this.orderNumber = orderNumber;
            this.item = item;
        }

        void processOrder() {
            System.out.println("Ordering " + item + " for order number " + orderNumber);
        }
    }


Catalog: Factory and cache for Item flyweight objects

    import java.util.HashMap;
    import java.util.Map;

    //Catalog acts as a factory and cache for Item flyweight objects
    public class Catalog {
        private Map<String, Item> items = new HashMap<String, Item>();

        //factory method
        public Item lookup(String itemName) {
            if (!items.containsKey(itemName))
                items.put(itemName, new Item(itemName));
            return items.get(itemName);
        }

        public int totalItemsMade() {
            return items.size();
        }
    }


InventorySystem, keeps some state and acceses Catalog methods, uses it.

    public class InventorySystem {

        private final Catalog catalog = new Catalog();
        private final List<Order> orders = new CopyOnWriteArrayList<Order>();

        void takeOrder(String itemName, int orderNumber) {
            Item item = catalog.lookup(itemName);
            Order order = new Order(orderNumber, item);
            orders.add(order);
        }

        void process() {
            for (Order order : orders) {
                order.processOrder();
                orders.remove(order);
            }
        }

        String report() {
            return "\nTotal Item objects made: "
                    + catalog.totalItemsMade();
        }
    }
    
Main

    public static void main(String[] args) {
		InventorySystem ims = new InventorySystem();

		ims.takeOrder("Roomba", 221);
		ims.takeOrder("Bose Headphones", 361);
		ims.takeOrder("Samsung TV", 432);
		ims.takeOrder("Samsung TV", 323);
		ims.takeOrder("Roomba", 563);
		ims.takeOrder("Bose Headphones", 321);
		ims.takeOrder("Roomba", 234);
		ims.takeOrder("Samsung TV", 54);
		ims.takeOrder("Roomba", 34);
		ims.takeOrder("Bose Headphones", 365);
		ims.takeOrder("Samsung TV", 332);
		ims.takeOrder("Roomba", 456);

		ims.process();
		
		System.out.println(ims.report());

	}
    
# Pitfalls
- A bit of a complex pattern
- Premature optimization focused, which is something your usually figure out later in the product lifecycle
- Uses Factory, which you have to understand
- Not a graphical pattern only.

# Flyweight vs FAcade

Flyweight
- Its an Optimization Pattern
- Focused in memory optimization
- Deals with IMMUTABLE Objects
- Transparent to the Client, designed for the client not to know whats going on under the hood.

Facade
- Refactoring pattern
- Focused on simplify things to the Client
- Its entire goal is to provide a DIFFERENT INTERFACE to the client.

# Summary

- GREAT FOR MEMORY MANAGEMENT
    - when we know that we are going to have  alot of objects flying around the system.
    - And we dont want every client in the system, to create a new instance of that object

- Little bit comples:
    - Factory
    - Immutability
    - little objects 
    
- It is Used a LOT in the core Java API 
