## Albatross

#### Current state:
A decentralized app store. Written in React, and built to run on the Arweave permaweb with no external dependencies. 


Version 0.1 is deployed here: https://arweave.net/lwmZivelMcNjt6gRiESSgsIAl8WpFpq679c_Pt7L900

A convenient (centralized) redirect is available here: https://albatross.link

A video demo is available here: https://www.youtube.com/watch?v=DXyY1X9m0Pc

#### Features for v0.1:
- User Login
- Uploading of Chrome/Firefox extensions
- Listing of Chrome/Firefox extensions
- Fully hosted on Arweave without any external dependencies

#### Currently under works for v0.2:
- Update notification: a statusbar at the top of the app store to notify users of newer versions of the app store which have subsequently been deployed
- User reviews
- Search & better filtering


#### Planned features:
- Chunked uploads/downlads to circumvent the 2mb limit (or maybe wait until Arweave supports larger, although tests of chunks have worked well thus far)
- App versioning: functionality has been written to support this, but is not currently usable
- Integration with Firefox & Chrome store APIs (retrieve extension, retrieve 'external' reviews - this is very feasible for Firefox, they provide an extensive public API)
- At some point, more effective management of how apps are stored & retrieved, as the current implementation will not scale well
