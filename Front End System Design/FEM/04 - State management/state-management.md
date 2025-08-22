# State management

## 1 - Normalization

Use normalisation to reduce nesting of the data.
Reference by Ids

## 2 - Minimise the search cost

Use inverted index tables to search for text efficiently.
You can an async job, like service workers to cache the search results or

## 3 - choose appropriate storage

localStorage, sessionStorage or indexedDB

If you have. alot of data to use in the UI, you can shard it in diff storage types, some in memory, lots in indexedDB

Modern browsers ship IndexedDB. It’s a built-in, per-origin database for storing lots of structured data (way bigger and more flexible than localStorage).

Offline apps, large datasets, syncing, caching API responses.

When you need indexes/queries or binary blobs (images, files).

Notes

Storage limits are generous but not infinite; users can clear it.

For durable/offline apps, consider asking for persistence: navigator.storage?.persist().

If you prefer promises, use a tiny wrapper like idb/idb-keyval to avoid callback boilerplate.
