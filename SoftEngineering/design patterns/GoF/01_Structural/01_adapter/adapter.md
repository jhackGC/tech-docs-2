# Adapter defign pattern
Good for connecting new code to legacy code, without having to change the working contract that was produced from the legacy code originally.

## Concepts
- Convert interface into another interface
- Usually to adapt legacy code
- Translates requests from client to adaptee
- Client -> Adapter -> Adaptee
- Examples
    - Arrays to Lists conversion, Arrays are kindo fLegacy and Lists have methods to ADAPT Arrays to List
    - Stream, almost all stream classes have adaptors to work with other streams or readers
    
## Design considerations
The adapter is vvery CLIENT centric, its is tiically implemented to adapt or integrate a new client to legacy components, new to old. 
- Often implemented as an interface but it can be a class

Client --> Adapter --> Adaptee (LegacyProduct)

The Client wants to do something that the Adaptee API does not support it, or we dont want to modify it to work that way.
So we will add an adapter that will carry out that operation for us, and finally integrate it with the client to do what we want in the legacy code.

## Example

Arrays.asList(...)

        Integer[] arrayOfInts = new Integer[]{42, 43, 44};

        //asList method is an adapter to convert an array to a List
        List<Integer> listOfInts = Arrays.asList(arrayOfInts);

        System.out.println(arrayOfInts);
        System.out.println(listOfInts);
        
NOTE:
- It is an adapter because it is just adapting functionality rather than decorating (Decorator pattern) or adding the class.
- The example only show a single adapter function, but the Adapter could be many.

## Excercise


We get a list of employees that show some fields. The Employee has a contract, an interface, an API, that is implemented by the EmployeeDB, the employee that comes from the DB.

But the employees coming from other legacy storage like LDAP or Excel sheets, do not comply to this API, 
AND WE DONT WANT TO CHANGE THEM TO MAKE THEM FIT as it is usually legacy code that we don't want to touch.

SO we use the Adapter DP to create Adapters (EmployeeAdapterLdap) for those legacy Employee storage/data sources.

AdapterDemo

    import java.util.List;

    public class AdapterDemo {

        public static void main(String[] args) {
            EmployeeClient client = new EmployeeClient();

            List<Employee> employees = client.getEmployeeList();

            // Will not work ! This is where the adapter comes into play.
            Employee employeeFromLdap = new EmployeeLdap("chewie", "Solo",
                    "Han", "han@solo.com");
            
            
            EmployeeLdap employeeFromLdap = new EmployeeLdap("chewie", "Solo",	"Han", "han@solo.com");

		      employees.add(new EmployeeAdapterLdap(employeeFromLdap));

            System.out.println(employees);
        }
    }


EmployeeDB - Conforms to the needed API, implements Employee I

    public class EmployeeDB implements Employee {

        private String id;
        private String firstName;
        private String lastName;
        private String email;

        public EmployeeDB(String id, String firstName, String lastName, String email) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
        }

        public String getId() {
            return id;
        }
        public void setId(String id) {
            this.id = id;
        }
        public String getFirstName() {
            return firstName;
        }
        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }
        public String getLastName() {
            return lastName;
        }
        public void setLastName(String lastName) {
            this.lastName = lastName;
        }
        public String getEmail() {
            return email;
        }
        public void setEmail(String email) {
            this.email = email;
        }

        public String toString() {
            return "ID: " + id + ", First name: " + firstName + ", Last name: " + lastName + ", Email: " + email;
        }

    }
    

EmployeeLdap, it does not comply with the API

    public class EmployeeLdap {

        private String cn;
        private String surname;
        private String givenName;
        private String mail;

        public EmployeeLdap(String cn, String surname, String givenName, String mail) {
            this.cn = cn;
            this.surname = surname;
            this.givenName = givenName;
            this.mail = mail;
        }

        public String getCn() {
            return cn;
        }
        public void setCn(String cn) {
            this.cn = cn;
        }
        public String getSurname() {
            return surname;
        }
        public void setSurname(String surname) {
            this.surname = surname;
        }
        public String getGivenName() {
            return givenName;
        }
        public void setGivenName(String givenName) {
            this.givenName = givenName;
        }
        public String getMail() {
            return mail;
        }
        public void setMail(String mail) {
            this.mail = mail;
        }	
    }


EmployeeAdapterLdap

    public class EmployeeAdapterLdap implements Employee {

        private EmployeeLdap instance;

        public EmployeeAdapterLdap(EmployeeLdap instance) {
            this.instance = instance;
        }

        @Override
        public String getId() {
            return instance.getCn();
        }

        @Override
        public String getFirstName() {
            return instance.getGivenName();
        }

        @Override
        public String getLastName() {
            return instance.getSurname();
        }

        @Override
        public String getEmail() {
            return instance.getMail();
        }

        public String toString() {
            return "ID: " + instance.getCn();
        }

    }
    

EmployeeCSV

    import java.util.StringTokenizer;

    public class EmployeeCSV {

        private int id;
        private String firstname;
        private String lastname;
        private String emailAddress;

        public EmployeeCSV(String values) {
            StringTokenizer tokenizer = new StringTokenizer(values, ",");
            if (tokenizer.hasMoreElements()) {
                id = Integer.parseInt(tokenizer.nextToken());
            }
            if (tokenizer.hasMoreElements()) {
                firstname = tokenizer.nextToken();
            }
            if (tokenizer.hasMoreElements()) {
                lastname = tokenizer.nextToken();
            }
            if (tokenizer.hasMoreElements()) {
                emailAddress = tokenizer.nextToken();
            }
        }

        public String getEmailAddress() {
            return emailAddress;
        }

        public String getFirstname() {
            return firstname;
        }

        public int getId() {
            return id;
        }

        public String getLastname() {
            return lastname;
        }

        public void setEmailAddress(String emailAddress) {
            this.emailAddress = emailAddress;
        }

        public void setFirstname(String firstname) {
            this.firstname = firstname;
        }

        public void setId(int id) {
            this.id = id;
        }

        public void setLastname(String lastname) {
            this.lastname = lastname;
        }
    }


EmployeeAdapterCSV - Some calculations or type conversions are allowed to adapt, without becoming a Decorator see getId().

    public class EmployeeAdapterCSV implements Employee {

        private EmployeeCSV instance;

        public EmployeeAdapterCSV(EmployeeCSV instance) {
            this.instance = instance;
        }

        @Override
        public String getId() {
            return instance.getId() + "";
        }

        @Override
        public String getFirstName() {
            return instance.getFirstname();
        }

        @Override
        public String getLastName() {
            return instance.getLastname();
        }

        @Override
        public String getEmail() {
            return instance.getEmailAddress();
        }

    }


## Pitfalls
- Not many
- Dont over complicate them
- Tipically an Adapter will have multiple types of Adapters
- Dont add functonality, that is the Decorator or t other type of structural pattern.

## Contrast

Adapter
- It makes things work after they were designed
- Basically for dealing wiht Legacy code.
- Is almost always retrofitted to make unrelated classes work together
- Essentially  created to provide a different interface to our legacy code than was originally intended  

Bridge
- Was designed upfront to let abstraction and implementation vary independently
- It is built in advance so that we can provide a layer of abstraction and let both systems be flexible WHILE we are implementing and creating them.

Both Adapter and Bridge
- Are meant to adapt multiple disparate systems and work in concert with one another

# Summary
- Simple solution for very dicrete problems
- Easy to implement
- Integrate with LEgacy we cant or want to change
- Can provide multiple adapters to interface with the Legacy API

