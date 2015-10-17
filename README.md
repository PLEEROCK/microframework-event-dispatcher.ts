# T-Event-Dispatcher module for Microframework

Adds integration between [t-event-dispatcher](http://github.com/PLEEROCK/t-event-dispatcher) and 
[microframework](https://github.com/PLEEROCK/microframework).

## Usage

1. Install module:

    `npm install --save microframework-t-event-dispatcher`

2. Simply register module in the microframework when you are bootstrapping it.
    
    ```typescript
    
        import {MicroFrameworkBootstrapper} from "microframework/MicroFrameworkBootstrapper";
        import {TEventDispatcherModule} from "microframework-t-event-dispatcher/TEventDispatcherModule";
        
        new MicroFrameworkBootstrapper({ baseDirectory: __dirname })
            .registerModules([
                new TEventDispatcherModule()
            ])
            .bootstrap()
            .then(result => console.log('Module is running. Subscribers can be used now'))
            .catch(error => console.error('Error: ', error));
            
    ```

3. Now you can use [t-event-dispatcher](https://github.com/PLEEROCK/t-event-dispatcher) module in your microframework.

## Todos

* cover with tests
* add more docs