# bitstorm

BitStorm provides data gathering/logging services for "Internet of Things" (IoT) connected devices.

## Usage

All services are exposed as RESTful API calls. This incurs a large packet overhead, but the idea is that a central router
at the remote site will intelligently batch communication to offset the TCP/HTTP frame cost.

## Implementation

* BitStorm is implemented as a [Node.js](http://nodejs.org) application 
* using [MongoDb](http://mongodb.org) as it's datastore.
* It is currently running on an Ubuntu instance 
* hosted in the Rackspace cloud and 
* uses [upstart](http://http://upstart.ubuntu.com/) for service implementation.

## Developing

Development is ongoing, and this is just a test api to get used to Linux-based development, Node.js, MongoDb,
and development software on a Mac.

### Prerequisites

* A system user named 'bitstorm' should be created. No shell/home directory is necessary. This is the
  user that the upstart service runs the application as via sudo.
* MongoDb should already be installed. Currently, the application points to localhost.

### Tools

Development is done on a Mac using [TextMate](http://http://macromates.com/).
