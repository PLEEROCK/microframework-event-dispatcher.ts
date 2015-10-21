import {TEventDispatcherModuleConfig} from "./TEventDispatcherModuleConfig";
import {Module} from "microframework/Module";
import {ModuleInitOptions} from "microframework/Module";
import {Utils} from "t-event-dispatcher/Utils";
import {defaultMetadataRegistry} from "t-event-dispatcher/MetadataRegistry";

/**
 * T-Event-Dispatcher module integration with microframework.
 */
export class TEventDispatcherModule implements Module {

    // -------------------------------------------------------------------------
    // Constants
    // -------------------------------------------------------------------------

    public static DEFAULT_SUBSCRIBER_DIRECTORY = 'subscriber';

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private options: ModuleInitOptions;
    private configuration: TEventDispatcherModuleConfig;

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    getName(): string {
        return 'TEventDispatcherModule';
    }

    getConfigurationName(): string {
        return 't-event-dispatcher';
    }

    init(options: ModuleInitOptions, configuration: TEventDispatcherModuleConfig): void {
        this.options = options;
        this.configuration = configuration;
    }

    onBootstrap(): Promise<any> {
        return Promise.resolve();
    }

    afterBootstrap(): Promise<any> {
        Utils.requireAll(this.getSubscriberDirectories());
        defaultMetadataRegistry.container = this.options.container;
        return Promise.resolve();
    }

    onShutdown(): Promise<any> {
        return Promise.resolve();
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    private getSubscriberDirectories(): string[] {
        if (!this.configuration || !this.configuration.subscriberDirectories)
            return [this.options.frameworkSettings.baseDirectory + '/' + TEventDispatcherModule.DEFAULT_SUBSCRIBER_DIRECTORY];

        return this.configuration.subscriberDirectories;
    }

}