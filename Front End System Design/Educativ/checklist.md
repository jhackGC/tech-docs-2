A checklist to design frontend systems for a system design interview:

REDCAAP

# RE - Requirements

- Functional requirements: What it has to do
- Non-functional requirements:

  - Performance / Latency / Responsiveness: How fast and responsive the system is (latency is a component of performance/responsiveness)
  - Availability: Uptime and fault tolerance
  - Scalability: How the system handles increased load or volume
  - Security: How it protects against threats
  - Usability/Accessibility/Compatibility/Localization: How easy it is to use, in different devices and contexts

# D - Design

Organize the frontend system in a structured and efficient way. Design patterns are essential because they improve maintainability and prevent code duplication

- MVC vs. MVVM vs. MVP
- SPA vs. MPA
- Monolithic SPA vs. micro-frontend
- Component-based vs. monolithic UI
- Unidirectional vs. bidirectional data flow

## C - Component and hierarchy

- How to break down a UI into independent, reusable components
- The importance of a hierarchical structure
- State management within components, avoiding unnecessary re-renders and optimizing updates

## A - Architecture

This step bridges the gap between UI composition and backend integration, laying the foundation for a responsive, maintainable, and scalable system

- how modular frontend components form a cohesive user interface
- how these components map to backend services

## A - API

1. choose the right API architectural style, communication protocol, and data format.

2. Define clear, modular, and purpose-driven API endpoints.

3. Define optimized data models and API architectures that minimize over-fetching and under-fetching, ensuring that the frontend gets the data it needs in the most efficient format.

## P - Performance optimization

- **_Performance_**: Ensuring fast rendering, optimized network requests, and smooth interactions.

- **_Compatibility_**: Supporting multiple devices, browsers, and screen resolutions.

- **_Accessibility (a11y)_**: Designing inclusive applications for users with disabilities.

- **_Security_**: Protecting user data and preventing frontend vulnerabilities.

- **_Localization and internationalization_**: Making sure the frontend supports multiple languages, currency formats, and regional settings.

NFRs

- **_Performance_**: Fast loading times, smooth interactions, and efficient resource usage.
- **_Reliability_**: System uptime, error rates, and graceful degradation strategies, error management.
- **_Scalability_**: Ability to handle increased load and user growth without performance degradation.
- **_Security_**: Protection against threats, data breaches, and ensuring user privacy.
- **_Maintainability_**: Ease of updating, fixing bugs, and adding new features without extensive rework.
