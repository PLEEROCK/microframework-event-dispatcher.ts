import {EventDispatchModuleConfig} from "./EventDispatchModuleConfig";
import {Module} from "microframework/Module";
import {ModuleInitOptions} from "microframework/Module";
import {defaultMetadataRegistry} from "event-dispatch/MetadataRegistry";
import * as fs from "fs";
import * as path from "path";

/**
 * event-dispatch module integration with microframework.
 */
export class EventDispatchModule implements Module {

    // -------------------------------------------------------------------------
    // Constants
    // -------------------------------------------------------------------------

    public static DEFAULT_SUBSCRIBER_DIRECTORY = "subscriber";

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private options: ModuleInitOptions;
    private configuration: EventDispatchModuleConfig;

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    getName(): string {
        return "EventDispatchModule";
    }

    getConfigurationName(): string {
        return "event-dispatch";
    }

    init(options: ModuleInitOptions, configuration: EventDispatchModuleConfig): void {
        this.options = options;
        this.configuration = configuration;
    }

    onBootstrap(): Promise<any> {
        return Promise.resolve();
    }

    afterBootstrap(): Promise<any> {
        this.requireAll(this.getSubscriberDirectories());
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
            return [this.getSourceCodeDirectory() + EventDispatchModule.DEFAULT_SUBSCRIBER_DIRECTORY];

        return this.configuration.subscriberDirectories;
    }

    private getSourceCodeDirectory() {
        return this.options.frameworkSettings.srcDirectory + "/";
    }

    /**
     * Makes "require()" all js files (or custom extension files) in the given directory.
     * todo: use require-all instead
     */
    private requireAll(directories: string[], extension: string = ".js"): any[] {
        let files: any[] = [];
        directories.forEach((dir: string) => {
            if (fs.existsSync(dir)) {
                fs.readdirSync(dir).forEach((file: string) => {
                    if (fs.statSync(dir + "/" + file).isDirectory()) {
                        let requiredFiles = this.requireAll([dir + "/" + file], extension);
                        requiredFiles.forEach((file: string) => files.push(file));
                    } else if (path.extname(file) === extension) {
                        files.push(require(dir + "/" + file));
                    }
                });
            }
        }); // todo: implement recursion
        return files;
    }

}
