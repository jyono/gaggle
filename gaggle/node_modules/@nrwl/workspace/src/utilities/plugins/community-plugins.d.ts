import { CommunityPlugin, PluginCapabilities } from './models';
export declare function fetchCommunityPlugins(): Promise<CommunityPlugin[]>;
export declare function listCommunityPlugins(installedPlugins: PluginCapabilities[], communityPlugins: CommunityPlugin[]): void;
