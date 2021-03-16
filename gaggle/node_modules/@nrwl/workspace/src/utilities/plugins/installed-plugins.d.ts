import { CommunityPlugin, CorePlugin, PluginCapabilities } from './models';
export declare function getInstalledPluginsFromPackageJson(workspaceRoot: string, corePlugins: CorePlugin[], communityPlugins: CommunityPlugin[]): Array<PluginCapabilities>;
export declare function listInstalledPlugins(installedPlugins: PluginCapabilities[]): void;
