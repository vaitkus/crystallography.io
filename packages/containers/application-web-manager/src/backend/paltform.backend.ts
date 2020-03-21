import { PlatfomContext, Platform, PlatformType, Plugin } from "../interfaces";

type PlatformFactory = () => Platform;
type PlatfomContextFactory = () => PlatfomContext;

export const getPlatfom: PlatformFactory = () => {
    const context: {
        plugins: Plugin[],
        initialized: boolean,
        views: any[],
        resources: any[],
        indexHtml: any,
    } = {
        plugins: [],
        initialized: false,
        views: [],
        resources: [],
        indexHtml: () => "",
    };
    const publicContext: any = {
        name: "backend-platform",
        type: PlatformType.backend,
        version: "0.0.1",
        registerView: () => {
            return;
        },
        registerResources: () => {
            return;
        },
        registerIndexHtml: () => {
            return;
        },
    };

    const addPlugin = async (plugin: Plugin) => {
        const { initialized, plugins } = context;
        if (initialized) {
            return  Promise.reject();
        }
        plugins.push(plugin);
    };

    const initialize = async () => {
        const { plugins } = context;
        for (const plugin of plugins) {
            await plugin.initialize(publicContext);
        }
        context.initialized = true;
    };
    return {
      addPlugin,
      initialize,
    };
};
