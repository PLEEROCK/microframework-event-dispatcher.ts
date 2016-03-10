import {EventDispatcherTsModuleConfig} from "./EventDispatcherTsModuleConfig";
import {Module} from "microframework/Module";
import {ModuleInitOptions} from "microframework/Module";
import {Utils} from "event-dispatcher.ts/Utils";
import {defaultMetadataRegistry} from "event-dispatcher.ts/MetadataRegistry";

/**
 * T-Event-Dispatcher module integration with microframework.
 */
export class EventDispatcherTsModule implements Module {

    // -------------------------------------------------------------------------
    // Constants
    // -------------------------------------------------------------------------

    public static DEFAULT_SUBSCRIBER_DIRECTORY = "subscriber";

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private options: ModuleInitOptions;
    private configuration: EventDispatcherTsModuleConfig;

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    getName(): string {
        return "EventDispatcherTsModule";
    }

    getConfigurationName(): string {
        return "event-dispatcher.ts";
    }

    init(options: ModuleInitOptions, configuration: EventDispatcherTsModuleConfig): void {
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
            return [this.getSourceCodeDirectory() + EventDispatcherTsModule.DEFAULT_SUBSCRIBER_DIRECTORY];

        return this.configuration.subscriberDirectories;
    }

    private getSourceCodeDirectory() {
        return this.options.frameworkSettings.srcDirectory + "/";
    }

}
