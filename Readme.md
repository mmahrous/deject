# Dependency Injection
This is a simple package for dependency injection.

### Usage 
```JS
const config = require('./config')
const DI = require('di')(config)
DI.register('port', port)
DI.register('name', name)
DI.get('server')
```
### Configuration
This DI needs a configuration as config.js file 
```JSON
module.exports = {
    factory: {
        ...
    },
    register: {
        ...
    }
}
```
# License
This project is licensed under the MIT license. See the LICENSE file for more info.