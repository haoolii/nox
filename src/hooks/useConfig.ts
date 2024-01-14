import * as appConfig from '../config/app-config';

export const useConfig = () => {
    return {
        l1: appConfig.bridge.l1,
        l2: appConfig.bridge.l2,
        tokens: appConfig.bridge.tokens
    }
}

