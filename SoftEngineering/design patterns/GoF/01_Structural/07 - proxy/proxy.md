# Proxy - Intro

Is an Interface to something else.

# Concepts

- Interface by Wrapping an object with a Class
- Can add functionality
- Can solve multiple problems as:
  - Security
  - Simplicity
  - Remote
  - Costly object to create
- The proxy is called to access the REAL OBJECT
- Exmaples in Java API:
  - java.lang.reflect.Proxy : is a mechanism to facilitate creating proxy patterns using Java
  - java.rmi.\* : This package is all about accesing remote objects and retrieving that data across the wire.

# Design

"Intermediary object that intercepts calls"

- Interface based

  - Many frameworks like Spring, Hibernate, a ohter various dependency injection frameworks ue it.

- It sits in between the Interface and Implementation Class

- The Java API recognizes the need for the Proxy Pattern and incorporate an interface, the InvocationHandler, and a class, the java.lang.reflect.Proxy to facilitate this.

- Pieces of the UML diagram

  - Client
  - Interface
  - InvocationHandler
  - Proxy
  - Implementation

  - The Client Class makes a reference call to some object, the Subject
  - and instead that it retrieving the real subject that we want, it's going to be intercepted with this Proxy.
  - The Subject would be an interface to whatever the Implementation class is that we want to retrieve.
  - The Proxy, using an InvocationHandler and the Proxy class in Java, intercepts that call and makes the call to the RealSubject, or use security to allow or deny it, or do something different. Then it turns around and sees if it needs to load that, or pull it from a cache, etc. and Decides that it will load that RealObject back to the Client.

**So we have an Interface (Subject) and the Implementation (RealSubject) and the PRoxy handles the calls in between them.**

# Example: Proxy

- Create an implementation of a proxy that will call Twitter

Roles

- Client:
- Subject / Interface: TwitterService
- InvocationHandler
- Proxy: SecurityProxy
- RealSubject / Implementation: TwitterServiceStub

  1.  Interface -> TwitterService interface

          public interface TwitterService {
              public String getTimeline(String screenName);
              public void postToTimeline(String screenName, String message);
          }

  2.  RealSubject / Implementation: TwitterServiceStub

          public class TwitterServiceStub implements TwitterService {

              @Override
              public String getTimeline(String screenName) {
                  return "My neato timeline";
              }

              @Override
              public void postToTimeline(String screenName, String message) {
              }
          }

  3.  We are going to put a SECURITY proxy, in between The Interface and the Implementation class, that also implements the Interface, and ALSO implements the InvocationHandler, to hanlde calls to the Interface.

  We implement the InvocationHandler, that forces us to implement the invoke(...) method

  Before we created a kind of Factory that creates our proxy based on the interface and the impl class, and our proxy.

  For that we use the RalSubject class. The Proxy has an instance of the RealSubject, set in the constructor.

                private Object obj; // RealSubject

                private SecurityProxy(Object obj) {
                    this.obj = obj;
                }

  We create and return the proxy instance, which is created using the Proxy, and the RealSubject class and SubjectInterface

        public static Object newInstance(Object obj) {
            Object theRealSubject = obj.getClass().getClassLoader(); // TwitterServiceStub and then TwitterServiceImpl
            Object theSubject = obj.getClass().getInterfaces(); // TwitterService
            Object theProxy = new SecurityProxy(obj); // SecurityProxy

            return java.lang.reflect.Proxy.newProxyInstance(theClass, theSubject, theProxy);
        }

  Then the invocation handling happens
  Here is where we tell if our methods in the RealSubject will be called or not

        @Override
        public Object invoke(Object proxy, Method m, Object[] args) throws Throwable {
            Object result;
            try {
                    if(m.getName().contains("post")) {
                        throw new IllegalAccessException("Posts are currently not allowed");
                    }
                    else {
                        result = m.invoke(obj, args);
                    }
                } catch (InvocationTargetException e) {
                throw e.getTargetException();
            } catch (Exception e) {
                throw new RuntimeException("unexpected invocation exception: "
                        + e.getMessage());
            }
            return result;
        }

  Full Proxy code

            import java.lang.reflect.InvocationHandler;
            import java.lang.reflect.InvocationTargetException;
            import java.lang.reflect.Method;

            public class SecurityProxy implements InvocationHandler {

                private Object obj;

                private SecurityProxy(Object obj) {
                    this.obj = obj;
                }

                public static Object newInstance(Object obj) {
                    return java.lang.reflect.Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj
                            .getClass().getInterfaces(), new SecurityProxy(obj));
                }

                @Override
                public Object invoke(Object proxy, Method m, Object[] args) throws Throwable {
                    Object result;
                    try {
                            // I can restrict access to my RealSubject here ... in the invoke method
                            if(m.getName().contains("post")) {
                                throw new IllegalAccessException("Posts are currently not allowed");
                            }
                            else {
                                result = m.invoke(obj, args);
                            }
                        } catch (InvocationTargetException e) {
                        throw e.getTargetException();
                    } catch (Exception e) {
                        throw new RuntimeException("unexpected invocation exception: "
                                + e.getMessage());
                    }
                    return result;
                }

            }

Main

    public static void main(String[] args) {

        // Subject theSubject = (Subject) Proxy.newInstance(new RealSubject());
    	TwitterService service = (TwitterService) SecurityProxy.newInstance(new TwitterServiceImpl());

        // theSubject.doAction(); -> the reference theSubject point to a Proxy instance, that "intercepts" the call
        // by running the Proxy's invoke(...) method  and allowing, or not, the invokation of the method int the RealSubject encapsulated in the Proxy.
    	System.out.println(service.getTimeline("bh5k"));

        // theSubject.doAction();
    	service.postToTimeline("bh5k", "Some message that shouldn't go through.");
    }

RealSubject / Implementation: real implementation of TwitterServiceStub: TwitterServiceImpl

        import java.util.List;

        import twitter4j.Query;
        import twitter4j.QueryResult;
        import twitter4j.Status;
        import twitter4j.Twitter;
        import twitter4j.TwitterException;
        import twitter4j.TwitterFactory;
        import twitter4j.conf.ConfigurationBuilder;

        //https://gist.github.com/bh5k/...

        public class TwitterServiceImpl implements TwitterService {

            private static final String TWITTER_CONSUMER_KEY = "<consumer key>";
            private static final String TWITTER_SECRET_KEY = "<secret key>";
            private static final String TWITTER_ACCESS_TOKEN = "<access token>";
            private static final String TWITTER_ACCESS_TOKEN_SECRET = "<token>";

            @Override
            public String getTimeline(String screenName) {

                ConfigurationBuilder cb = new ConfigurationBuilder();
                cb.setDebugEnabled(true)
                    .setOAuthConsumerKey(TWITTER_CONSUMER_KEY)
                    .setOAuthConsumerSecret(TWITTER_SECRET_KEY)
                    .setOAuthAccessToken(TWITTER_ACCESS_TOKEN)
                    .setOAuthAccessTokenSecret(TWITTER_ACCESS_TOKEN_SECRET);
                TwitterFactory tf = new TwitterFactory(cb.build());
                Twitter twitter = tf.getInstance();
                StringBuilder builder = new StringBuilder();
                try {
                    Query query = new Query(screenName);
                    QueryResult result;
                    do {
                        result = twitter.search(query);
                        List<Status> tweets = result.getTweets();
                        for (Status tweet : tweets) {
                            builder.append("@" + tweet.getUser().getScreenName() + " - " + tweet.getText());
                            builder.append("\n");
                        }
                    } while ((query = result.nextQuery()) != null);

                } catch (TwitterException te) {
                    te.printStackTrace();
                    System.out.println("Failed to search tweets: " + te.getMessage());
                }
                return builder.toString();
            }

            @Override
            public void postToTimeline(String screenName, String message) {
                //we aren't going to allow this
                System.out.println(message);
            }
        }

# Pitfalls

- We can have only ONE proxy
  - If you want to implement security and auditing, we have to do it in that one proxy, we can't separate them out.
  - Some other patterns will allow you to chain, or wrap, but proxy you can only have one instance
- Adds another Abstraction layer.
  - Could lead to issues like a remote proxy, if you believe you are accessing something local and it is in fact, remote, you might get errors that you wouldn't maybe be expecting
- Very similar to other patterns.
  - Could be har dto identify if you need a Proxy, or a Decorator or an Adapter.
    - Easir to indentify you nneed a proxy if it incvolves remote stuff

# Proxy vs Decorator

Proxy

- Can add functionality, but it is not its main purpose
- WE can only have one PROXy for that Class instance
- Its functionality is set at compile time
  - We determine upfront what cla ss we're trying to call a remote call, or any other type of interface , virtual or remote

Decorator

- Its main purpose is to add functioanlity
- WE can have many decorators for a class.
- DINAMICALLY ADDS FUNCTIONALITY, its purpose is to chain on the fly. Its functionality is set at run time. We chain at runtime an the final object will know what to do.
- Its a chained pattern
- POints to its own type
  - whereas a proxy is intercepting a call to some different subclass or subtype, a decorator is usually looking at something else in the hirearchical chain.

# Summary

- Great utilities built into Java API
  - Proxy call and Invocation handler interface facilitates to implement this pattern in Java
- A drawback is that you only get one proxy per Subject you want to proxy to
  - You cant chain them or build upon them
  - If you have to add things to it , you may get some bloated coe inside tht proxy as you add features to it.
- Used a LOT by DIJ/IoC framewors
- Some use it to imlement lazy loading, but it is not the intention of the proxy
