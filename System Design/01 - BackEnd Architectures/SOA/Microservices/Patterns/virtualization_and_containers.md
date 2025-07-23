# Virtualization and Containers

Using virtualization and containers to manage and scale microservices.

Let's now briefly discuss the world of virtualization and containers, technologies that not only solve infrastructure issues, but they also make it easier to manage and scale your services.

While they are not strictly necessary for microservices, nowadays it's very common to see them used in combination, as they make it easier to implement many of the patterns and best practices we saw previously.

I'm sure you came across that "it works on my machine" syndrome at some point of your career.
The same exact code behaves differently in one environment than another environment.

This is because the code interacts with other elements of that environment. It uses shared libraries. It's run by potentially different operating systems with different versions of programs, etc.

One solution to this problem is to ship the entire machine instead of just the programming. So in that way, you make sure that once it works on your machine, it works everywhere.
This is what we mean when we talk about portability, the same application works in different environments.

**_Virtualization_** is a technology that allows you to create multiple simulated environments or dedicated resources from a single physical hardware system. It allows multiple operating systems to run concurrently on a single physical machine.

This ensures better resource allocation and isolation from one virtual machine to the other. However, having to run a full operating system inside each virtual machine implies some overhead and costs.

That's why **_containers_** take the same idea, but they only ship a minimal version of the operating system, which actually shares some resources with the host operating system.
This decreases the isolation a little, but it also provides less overhead.

With tools like **_Docker_**, you can package your application and all its dependencies together in a container, which is lightweight and quicker to start, which is a desirable characteristic for microservices.

Finally, managing a cluster of virtual machines or machines running containers can be challenging. Tools like **_Kubernetes_** take this to the next level by automating the distribution, scaling, and management of containerized applications.

**_Kubernetes_** can automatically scale services up or down based on utilization or other metrics or automatically restart a container if it crashes, for example.

But it also provides a descriptive API that allows you to control the infrastructure of your cluster, providing built‑in features like service discovery, metrics, logs, and allowing to easily implement many of the patterns we saw like sidecar containers, service meshes, A/B testing, etc.
