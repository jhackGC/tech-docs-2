# Facade - Intro
Proper pronociation is "fasad" not facade

**Provides a simplified interface to a complex or difficult to use system that is often the result of a poorly designed API**

# Concepts
You would use it when
- You want to make an API easier to use, wrapping a **poorly designed** or **complex** API and hide the details from the client
- Reduce dependencies on outside code
- Simplify interface or client usage
- Refactoring pattern
- Examples:
    - java.net.URL
    There is a lot of functionality behind the URL class and it provides a simple interface to the end user
    - javax.faces.context.FacesContext (JEE)
 
# Design
It is simple
- Its a class that utilizes composition
- You shouldn't have the need for inheritance
- Tipically encompasses full lifecycle of the object you are dealing with, but id doesnt have to to be considered a correct use of this pattern
- UML Pieces
    - Facade contains other classes or packages
    
## Example: the URL class
It looks simple but handles a lot


        public static void main(String args[]) throws Exception {

            URL url = new URL("http", "www.pluralsight.com", 80, "/author/bryan-hansen");

            BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));

            String inputLine;

            while ((inputLine = in.readLine()) != null) {
                System.out.println(inputLine);
            }
        }
        
# Demo: JDBC without a facade


    public class JdbcDemo {

        public static void main (String args []) {
            DbSingleton instance = DbSingleton.getInstance();

            try {
                Connection conn = instance.getConnection();

                Statement sta = conn.createStatement();
                int count = sta.executeUpdate("CREATE TABLE Address (ID INTEGER, StreetName "
                        + "VARCHAR(20), City VARCHAR(20))");

                System.out.println("Table created.");
                sta.close();

                sta = conn.createStatement();
                count = sta.executeUpdate("INSERT INTO Address (ID, StreetName, City) "
                        + "values (1, '1234 Some street', 'Layton')");
                System.out.println(count + " record(s) created.");
                sta.close();

                sta = conn.createStatement();
                ResultSet rs = sta.executeQuery("SELECT * FROM Address");

                while(rs.next()) {
                    System.out.println(rs.getString(1) + " " + rs.getString(2) + " " + rs.getString(3));
                }

            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    
# Demo: JDBC with a facade


JdbcFacade

All the main operations have been nmoved to methods, that handle the operation, open and closes resources, etc.

    import java.sql.Connection;
    import java.sql.ResultSet;
    import java.sql.Statement;
    import java.util.ArrayList;
    import java.util.List;

    public class JdbcFacade {

        DbSingleton instance = null;

        public JdbcFacade() {
            instance = DbSingleton.getInstance();
        }

        public int createTable() {
            int count = 0;
            try {
                Connection conn = instance.getConnection();
                Statement sta = conn.createStatement();
                count = sta.executeUpdate("CREATE TABLE Address (ID INTEGER, StreetName VARCHAR(20), City VARCHAR(20))");
                sta.close();
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
            return count;
        }

        public int insertIntoTable() {
            int count = 0;
            try {
                Connection conn = instance.getConnection();
                Statement sta = conn.createStatement();
                count = sta.executeUpdate("INSERT INTO Address (ID, StreetName, City) values (1, '1234 Some street', 'Layton')");
                sta.close();
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
            return count;
        }

        public List<Address> getAddresses() {
            List<Address> addresses = new ArrayList<>();

            try {
                Connection conn = instance.getConnection();
                Statement sta = conn.createStatement();
                ResultSet rs = sta.executeQuery("SELECT * FROM Address");

                while(rs.next()) {
                    System.out.println(rs.getString(1) + " " + rs.getString(2) + " " + rs.getString(3));
                    Address address = new Address();
                    address.setId(rs.getString(1));
                    address.setStreetName(rs.getString(2));
                    address.setCity(rs.getString(3));

                    addresses.add(address);
                }

                rs.close();
                sta.close();
                conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }	

            return addresses;
        }	
    }

    class Address {
        private String id;
        private String streetName;
        private String city;

        public String getId() {
            return id;
        }
        public void setId(String id) {
            this.id = id;
        }
        public String getStreetName() {
            return streetName;
        }
        public void setStreetName(String streetName) {
            this.streetName = streetName;
        }
        public String getCity() {
            return city;
        }
        public void setCity(String city) {
            this.city = city;
        }



    }


Client code cleaned
FacadeJdbcDemo, doesn't have to know about meny things like the singleton, the resources management, etc.
Shows the simplicity our client now exepriences usin gthe Facade DP.

    import java.util.List;

    public class FacadeJdbcDemo {

        public static void main (String args []) {

            JdbcFacade jdbcFacade = new JdbcFacade();

            jdbcFacade.createTable();

            System.out.println("Table created.");

            jdbcFacade.insertIntoTable();

            System.out.println("Record inserted.");

            List<Address> addresses = jdbcFacade.getAddresses();

            for (Address address : addresses) {
                System.out.println(address.getId() + " " + address.getStreetName() + " " + address.getCity());
            }
        }
    }


# Pitfalls

- Tipically used to clean up code that was incorrectly designed

- If you are using it with a NEW API or Interface, maybe it is better to re-design the API instead, probably using another DP.

- Shouldnt utilize inheritance as it deals with a flat problem/structure

- It is the "Singleton" of the Structural Patterns, it is often misused or overused because is such an easy pattern to implement, and if you have to use it in a new API that means that the API might not be well designed.

# Facade vs Adapter

Facade
- Simplifies interface
- REFACTORING PATTERN, very useful for refactoring code
- Works tipically with just composites
- Cleaner API for a complex/poorly designed API

Adapter
- Also a REFACTORING pattern, very similar to Facade, but it MODIFIES (Adds) behavior
- Provides a different interface to client code, maybe updating yout API, while the Facade just want to make it easier to work with

# Summary
- Simplifies Client Interface by hiding complexities or bad code and hiding dependencies.
- Very easy to implement
- REFACTORING PATTERN, not good to use it upfront as that will be a clear sign that your new API is not properly designed.