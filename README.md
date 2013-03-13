
Downloads files to an on-disk cache.

No cache headers are respected; to clear the cache, clear the directory. It's very simple and prototypey, and it shouldn't be used in production in its current form.

See test.js for a usage example.

TODO:
- Execute as a command line utility.
- Respect cache headers (might need a manifest file).
