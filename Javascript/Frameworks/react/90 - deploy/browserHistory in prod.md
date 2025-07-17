browserHistory in prod



BrowserHistory in PRoduction
========================================================================
BrowserHistory and HashHistory

see image
both tell react router waht to consider in the url to understanda s a component id.

Browser History
example.com/users
Component to show decided by whats right of the TLD

Hash History
example.com/#/users
Component to show decided by find a hash in the URL and whats right of it is the component

- BrowserHistory is for pretty URLs

- HashHistory is for throwing a react router app on top of an existing application
localhost:8080/admin/#/users

