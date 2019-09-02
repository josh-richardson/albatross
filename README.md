## Albatross

#### Current state:

A decentralized app store. Written in React, and built to run on the Arweave permaweb with no external dependencies.

Version 0.1 is deployed here: https://arweave.net/lwmZivelMcNjt6gRiESSgsIAl8WpFpq679c_Pt7L900

Version 0.2 is deployed here: https://arweave.net/Jwa_gxrwhlsQ6UUPyy0MGX7qgKaLz4D3bNMFGmFAFN4

A convenient (centralized) redirect is available here: https://albatross.link

A video demo is available here: https://www.youtube.com/watch?v=DXyY1X9m0Pc

#### Changelog:

##### v0.1:

- [x] User Login
- [x] Uploading of Chrome/Firefox extensions
- [x] Listing of Chrome/Firefox extensions
- [x] Fully hosted on Arweave without any external dependencies

##### v0.2

- [x] Various CSS fixes
- [x] Fixed bug whereby a refresh on addon details page would cause an exception
- [x] User reviews implemented
- [x] Added favicon
- [x] Update notification: a statusbar at the top of the app store to notify users of newer versions of the app store which have subsequently been deployed

#### In progress:

##### v0.3

- [x] Ability to update apps
- [x] Simple search implementation
- [ ] User profiles
- [ ] A simple ToS?

#### Planned features:

- Chunked uploads/downlads to circumvent the 2mb limit (or maybe wait until Arweave supports larger, although tests of chunks have worked well thus far)
- App versioning: functionality has been written to support this, but is not currently usable
- Integration with Firefox & Chrome store APIs (retrieve extension, retrieve 'external' reviews - this is very feasible for Firefox, they provide an extensive public API)
- At some point, more effective management of how apps are stored & retrieved, as the current implementation will not scale well
- User profiles with posted reviews/apps/etc
- Search & better filtering
