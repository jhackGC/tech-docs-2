# Mock Interview Preparation

Commit to the stated requirements, do not overcommmit

Always start with the requirements, you need to understand them fully before jumping to solutions.

e.g. a Twitter news feed, a list where we render the stories, one after another, the stories are added dinamically, we have unlimited number of stories

## Requirements

- All stories are rendered form the top to the bottom
- There might be an infinite number of stories
- Our stories can contain media

Non-functional requirements:

- Its going to be used for mobile devices, and desktop, but mostly on mobiles.
- Network Limitations
- CPU / Memory efficient -> Performant
- Offline support to read stories while not connected

You may be given a Mock up

Notes:
For your solution, if given the chance reduce the scope, like the only media supported are images
Create a mock up to help you visualize the component structure and data flow.
Start doing some derivative deductions from the Functioanl requirements as well as from the NFRs, like

- As the app will target mobiles we have to understand there would be bandwidth limitations.
- Infi

---

Solutions

## Rendering

Infinite number of stories -> Retrieve many stories at once to reduce requests, and use a virtualized list to only render what's visible on the screen (using a library like react-window or react-virtualized, or implementing our own virtualization logic with observers and intersection observers)

Custom virtualization notes:
Why? with virtualization we remove/add nodes in the DOM as we scroll, improving performance and reducing memory usage.

IMPORTANT SITUATION WITH VIRTUALIZATION AND ACCESIBILITY:
When you move elements around with CSS, and render just the last few ones in the window, you dont re-render all the list, just move them and remove from the out of viewport, and add to the bottom of the viewport, so the browser does not know their position as the whole list was not re rendered, therefore that is not good for screen readers, focus and keys navigation.
In that case you could just use pagination, with a few items, and re render every time all the paged items for the browser being able to show their position to screen readers (e.g. Twitter).

## UI - State

- Normalise/Index the stories data to flat structures so they can be accessed by Id

- Normalized State structure:

        STORIES:
            [ID]: {
                id: string
                text: string
                media: attachment_id
                timestamp: number
            }

        COMMENTS:
            [ID]: {
                text: string
                author: string
                storyId: string
            }

          ATTACHMENTS:
              [ID]: {
                  url: string
                  storyId: string
              }

- optimise the data in memory by delegating it to the indexedDB, from runtime to hard drive

## API

getStories

how? Options

- short polling (avg 5 secs, keeps TCP connection alive)
- websockets
- server sent events

in our case:

- short polling: easy but latency high, reconnection, battery drain for keeping TCP conn alive, duplex antenna
- websockets: too energy consuming, super fast, we dont need to send data in real time to the server, no need for full duplex, costly
- server sent events: fast (close to websockets speed), mono directional (we dont need to send much, just mostly receive), lightweight, a bit of latency there for the first connection

We get the updated stories with SSE, but if we want more stories as we quickly scroll, we may use a REST API GET request call to fetch additional stories.

So the solution would be a combination of SSE for real-time updates and REST API calls for fetching more stories on demand.

so how the stories retrieval would be:

- Initial load with **_GET Request_**
  of stories to show a subset in the virtualised list (REST GET request), we could start always form the latest story or locally store the last page the user visited to re-open the app in the position it was last used (showing the last story you read), basically initial paginated call.
- Then real time updates with **_SSE_**
  to put on top of the data retrieved initially
- Retrieve older stories chunk with **_GET Request_**
  Eventually if needed to see older stories, get a chunk of requested stories on demand (REST GET), with pagination params like , init, offset, or page number

## Optimization

### Network

Use HTTP2 -> we can use multiplexing to send parallel requests over a single connection, reducing latency and improving loading times.

Bundle

- split optimised for the user-agent
- compress it
- to be served not from the API, but from a CDN (cache) (same for all assets like images)

Assets

- Images:
  - use the best available format, e.g. AVIF -> WebP -> JPEG in that preference order for photos
  - handel srcsets to retrieve the appropriate size for the screen size
- Fonts: - custom fonts , font-loading attribute to be sure you don ot wait 3 seonds until the custom fonts arrive

### Rendering

- DOM

  - Improve UX feedback, show loading UI
  - keep the same amount of nodes, constant amount of memory used -> that's why we use **_virtualization_**

  - flat CSS selectors, reduce long CSS compiling
  - avoid REFLOWS
    How:

    - Use CSS `transform` and `opacity` for animations (GPU accelerated, no reflow)
    - Batch DOM reads and writes
    - Use `position: absolute` or `position: fixed` to remove elements from normal flow
    - Use CSS containment (`contain: layout`)

### JS

Rule of thumb: DONT BLOCK THE UI THREAD

Do as much Async as you can:

Async jobs

- Use Service Workers
- Use web workers
- ask the server to do it, (API)
- idle callbacks, tell the browser to do the task when it's idle

Async storage

- use async storage like IndexedDB (localStorage and sessionStorage are SYNC)
- Using a service worker, small javascript piece of code, that caches the resources in the indexedDB, HTML, CSS, Images, etc.
  And when you load the application the next time, it will intercept the application requests to the server, and serve your asset from the indexedDB, and open the app offline.
