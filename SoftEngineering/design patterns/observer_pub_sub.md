Rather than single objects calling on the methods of other objects, an object instead
subscribes to a specific task or activity of another object and is notified when it occurs.
Observers are also called Subscribers and we refer to the object being observed as the Publisher (or the subject).
Publishers notify subscribers when events occur.


# example:
Event Model in Javascript

# Pros and cons
Pro: Very loose coupling between objects.

Pro: The ability to broadcast changes and updates.

Con: Potentially unexpected updates and sequencing issues.

