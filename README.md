# ovh angular manager navbar

![OVH components](githubBanner.png)

[![Maintenance](https://img.shields.io/maintenance/yes/2018.svg)]() [![Chat on gitter](https://img.shields.io/gitter/room/ovh/ux.svg)](https://gitter.im/ovh/ux) [![Build Status](https://travis-ci.org/ovh-ux/ovh-angular-manager-navbar.svg)](https://travis-ci.org/ovh-ux/ovh-angular-manager-navbar)

[![NPM](https://nodei.co/npm/ovh-angular-manager-navbar.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ovh-angular-manager-navbar/)

# Example

```javascript
angular.module("myapp", ["ovh-angular-manager-navbar"]).constant("UNIVERSE", "Foo");

```

```html
<manager-navbar></manager-navbar>
```

## Installation

### Bower

    bower install ovh-angular-manager-navbar --save

### NPM

    npm install ovh-angular-manager-navbar --save
 
 
## Configuration

1. Include `ovh-angular-manager-navbar.less` in your `app.less`:

  `@import "bower_components/ovh-angular-manager-navbar/less/ovh-angular-manager-navbar.less"`

2. Include `ovh-angular-manager-navbar.min.js` in your app:

  `<script src="bower_components/ovh-angular-manager-navbar/dist/ovh-angular-manager-navbar.min.js"></script>`

3. Add `ovh-angular-manager-navbar` as a new module dependency in your angular app.

  `var myapp = angular.module("myapp", ["ovh-angular-manager-navbar"]);`

4. Create a constant `UNIVERSE`

  `angular.module("myapp").constant("UNIVERSE", "Foo");`
 
## Get the sources
 
```bash
    git clone https://github.com/ovh-ux/ovh-angular-manager-navbar.git
    cd ovh-angular-manager-navbar
    npm install
    bower install
```
 
You've developed a new cool feature ? Fixed an annoying bug ? We'd be happy
to hear from you !

Have a look in [CONTRIBUTING.md](https://github.com/ovh-ux/ovh-angular-manager-navbar/blob/master/CONTRIBUTING.md)

## Run the tests
 
```
npm test
```
 
## Build the documentation
 
```
grunt ngdocs
```
 
## Related links
 
 * Contribute: https://github.com/ovh-ux/ovh-angular-manager-navbar
 * Report bugs: https://github.com/ovh-ux/ovh-angular-manager-navbar/issues
 * Get latest version: https://github.com/ovh-ux/ovh-angular-manager-navbar
 
## License
 
See https://github.com/ovh-ux/ovh-angular-manager-navbar/blob/master/LICENSE
