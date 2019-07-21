## Albatross

#### Current state:
A decentralized app store. Written in React, and built to run on the Arweave permaweb with no external dependencies. 

Deployed at: https://albatross.link

As of 23:59 EDT, current functionality exists here: https://arweave.net/MLMsOrBlWC6H-VKJfeMBPhh9y0Nie3L1UZuonpWPMns (however it's very much incomplete). See branch `before-hackathon-deadline` for state of code before 23:59. 

Future versions will be deployed below, although technically not elligible to compete in the hackathon :(


#### Features:
- User Login
- Uploading of Chrome/Firefox extensions
- Listing of Chrome/Firefox extensions
- Fully hosted on Arweave without any external dependencies

#### Planned features:
- Chunked uploads/downlads to circumvent the 2mb limit (or maybe wait until Arweave supports larger, although tests of chunks have worked well thus far)
- App versioning: functionality has been written to support this, but is not currently usable
- User reviews
- Integration with Firefox & Chrome store APIs (retrieve extension, retrieve 'external' reviews - this is very feasible for Firefox, they provide an extensive public API)
- Update notification: a statusbar at the top of the app store to notify users of newer versions of the app store which have subsequently been deployed
- Search & better filtering
- At some point, more effective management of how apps are stored & retrieved, as the current implementation will not scale well
