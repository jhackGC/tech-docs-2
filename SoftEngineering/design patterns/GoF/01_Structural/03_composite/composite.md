# Composite
Hierarchical type pattern that deals with tree structures of information

## Concepts
- Meant to TREAT COMPONENTS the SAME whether it is part of your structure or the whole structure itself

- this is done by configuring your objects into tree structures
- done this way you can treat individual objects THE SAME AS composite object
- By treating them the same we can operate on both the same operations, and expect them to work the same way
- Exmaples:
    - java.awt.Component
    - Java Server Faces
    - RESTful service GETs, the way we structure GETs has always the composite way in mind (for navigating and recurse down a directoy structure)
    
## Design
- Tree structured
- The root of the tree is a Component
    - Components are one of two things:
        - LEAF
        - COMPOSITE
    - They have the SAME OPERATIONS
    - The difference is that both have the same operations, bu the COMPOSITE also knows and operatos on its children objects
- The pieces of the DP are:
    - Component: Abstraction for all components, including composite ones.
        - Declares the interface for objects in the composition
        - Can also have methods for accesing the parent, but tha's optional in the DP.
        - Defines the operations.
    - Leaf: Represents the Leaf objects or nodes in the composition, and IMPLEMENTS all of the COMPONENT methods
    - Composite: Implements a Component that Has none or many components as children
        - Implements methods to MANIPULATE its CHILDREN
        - Implements all of the components methods as well, BUT TIPICALLY DELEGATES the FUNCTIONALITY TO ITS CHILDREN

## Example: Map
Map and other collections ar einteresting implementations of the DP.

Many in the Collections API have the option or method **addAll()**

One element of a map is treated as a an element or a composite

    aMap.putAll(anotherMap);
    
## Example: Menues

Our app will have:

- MenuComponent: Component
    - has the functionality to be consumed by its children
        - toString () method ... (operations)
- Menu: Composite
    - implements toString () method ... (operations)
    - add/remove/etc on the children
- MenuItem: Leaf
    - implements toString () method ... (operations)

Main

    public class Main {

        public static void main(String[] args) {

            Menu mainMenu = new Menu("Main", "/main");

            MenuItem safetyMenuItem = new MenuItem("Safety", "/safety");

            mainMenu.add(safetyMenuItem);

            Menu claimsSubMenu = new Menu("Claims", "/claims");

            mainMenu.add(claimsSubMenu);

            MenuItem personalClaimsMenu = new MenuItem("Personal Claim", "/personalClaims");

            claimsSubMenu.add(personalClaimsMenu);

            System.out.println(mainMenu.toString());
        }
    }


MenuComponent


    public abstract class MenuComponent {

        String name;
        String url;
        List<MenuComponent> menuComponents = new ArrayList<>();

        public MenuComponent add(MenuComponent menuComponent) {
            throw new UnsupportedOperationException("Feature not implemented at this level");
        }

        public MenuComponent remove(MenuComponent menuComponent) {
            throw new UnsupportedOperationException("Feature not implemented at this level");
        }

        public String getName() {
            return name;
        }

        public String getUrl() {
            return url;
        }	

        // Operation that will be common to Leaves and Composites as well
        public abstract String toString();

        // not part of the DP, it is just reusing the printing logic.
        String print(MenuComponent menuComponent) {
            StringBuilder builder = new StringBuilder(name);
            builder.append(": ");
            builder.append(url);
            builder.append("\n");
            return builder.toString();
        }
    }



Menu - Pay attention to the toString() method

    public class Menu extends MenuComponent {

        public Menu(String name, String url) {
            this.name = name;
            this.url = url;
        }

        @Override
        public MenuComponent add(MenuComponent menuComponent) {
            menuComponents.add(menuComponent);
            return menuComponent;
        }

        @Override
        public MenuComponent remove(MenuComponent menuComponent) {
            menuComponents.remove(menuComponent);
            return menuComponent;
        }

        @Override
        public String toString() {
            StringBuilder builder = new StringBuilder(); //builder pattern

            builder.append(print(this));

            // as a composite, Menu, knows about its children
            Iterator<MenuComponent> itr = menuComponents.iterator();
            while(itr.hasNext()) {
                MenuComponent menuComponent = itr.next();
                
                // Navigate through the tree structure 
                
                // Each child object structure can be handled the same way as its own leaf
                // so we just han dof fto it to do what it has to do (the toString())
                // We recourse down through the entire treee structure and then walk back up
                builder.append(menuComponent.toString()); 
            }

            return builder.toString();
        }
    }



MenuItem

    public class MenuItem extends MenuComponent {

        public MenuItem(String name, String url) {
            this.name = name;
            this.url = url;
        }

        @Override
        public String toString() {
            return print(this);
        }
    }
    
**So the children are treated the same as the parent object itself**

## Unsupported Operations
We can add features to our Component, and the hierarchy can use the, but it is optional.

These new feaatures will stablish our contract for all the implementations of the Component.

Those features are not abstract as we implement them down the hierarchical structure, if we want.

If we want our composites to implements more operations we can add them to the cComponent and override as needed.

MenuComponent

    public abstract class MenuComponent {

        String name;
        String url;
        List<MenuComponent> menuComponents = new ArrayList<>();

        public MenuComponent add(MenuComponent menuComponent) {
            throw new UnsupportedOperationException("Feature not implemented at this level");
        }

        public MenuComponent remove(MenuComponent menuComponent) {
            throw new UnsupportedOperationException("Feature not implemented at this level");
        }
        
# Pitfalls

- It can overly simplify a system
- It could be difficult to restrict what we wantot add to it.
    - Everything is treated the same, but you end up relying on runtime checks to see if objects being added can in fact be added instead of compile time SAFETY
- Impl could be costly, large composites using collection of collections ...

# Composite vs Decorator

**Composite**
- Tree structure
- Intent is to make a LEAF and a COMPOSITE to have the SAME INTERFACE to the client.
- Unity between objects

**Decorator**
- Contains nother entity (Composition)
- Modifies the behavior of the contained object (adds)
- Does NOT CHANGE the underlying object

# Summary
- Generalizes a hierarchical structure, and helps to navigate it.
- Can simplify things too much
- Easier for clients
    - The client didnt care if we had a menu, submenu, leaf, or anything, it just HANDLED IT all gracefully THE SAME WAY
    - The Collection addAll method didnt care if ew were adding one or an entire collection to the other collection ,it just handled it.
- COMPOSITE != COMPOSITION

