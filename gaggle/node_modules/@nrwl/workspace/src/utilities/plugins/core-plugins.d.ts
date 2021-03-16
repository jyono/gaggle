import { CorePlugin, PluginCapabilities } from './models';
export declare function fetchCorePlugins(): CorePlugin[];
export declare function listCorePlugins(installedPlugins: PluginCapabilities[], corePlugins: CorePlugin[]): void;
