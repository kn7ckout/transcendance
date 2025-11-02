const getUserAgent = (): string => window.navigator.userAgent

export const isWindows = (): boolean =>
    getUserAgent().toLowerCase().includes('win')

export const isMac = (): boolean => getUserAgent().toLowerCase().includes('mac')

export const isLinux = (): boolean =>
    getUserAgent().toLowerCase().includes('linux')
