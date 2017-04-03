> This repository is deprecated. Microframework architecure has changed. Please consider writing your own module for a newer versions of microframework.

# event-dispatch module for Microframework

Adds integration between [event-dispatch](http://github.com/pleerock/event-dispatch) and
[microframework](https://github.com/pleerock/microframework).

## Usage

1. Install module:

    `npm install --save microframework-event-dispatch`

2. Simply register module in the microframework when you are bootstrapping it.
    
    ```typescript
        import {MicroFrameworkBootstrapper} from "microframework/MicroFrameworkBootstrapper";
        import {EventDispatchModule} from "microframework-event-dispatch/EventDispatchModule";
        
        new MicroFrameworkBootstrapper({ baseDirectory: __dirname })
            .registerModules([
                new EventDispatcherTsModule()
            ])
            .bootstrap()
            .then(result => console.log('Module is running. Subscribers can be used now'))
            .catch(error => console.error('Error: ', error));
    ```

3. ES6 features are used, so you may want to install [es6-shim](https://github.com/paulmillr/es6-shim) too:

    `npm install es6-shim --save`

    you may need to `require("es6-shim");` in your app.

4. Now you can use [event-dispatch](https://github.com/pleerock/event-dispatch) module in your microframework.

## Todos

* cover with tests
* add more docs
