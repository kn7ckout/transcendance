import { Urls } from '@utils/constants'

export interface Dev {
    name: string
    id: string
}

export interface Command {
    name: string
    description: string
}

export type FeatureTarget =
    | 'discordDesktop'
    | 'vesktop'
    | 'adrenalin'
    | 'desktop'
    | 'web'
    | 'dev'
    | undefined

export interface Feature {
    name: string
    description: string
    tags: string[]
    authors: Dev[]
    dependencies: string[]
    hasPatches: boolean
    hasCommands: boolean
    commands: Command[]
    required: boolean
    enabledByDefault: boolean
    target: FeatureTarget
    filePath: string
    isModified: boolean
}

export interface FeatureUrlFetchType {
    all: 'ALL_FEATURES_URL'
    adrenalin: 'ADRENALIN_FEATURES_URL'
}

export const FeatureUrlKeys: FeatureUrlFetchType = {
    all: 'ALL_FEATURES_URL',
    adrenalin: 'ADRENALIN_FEATURES_URL',
}

export const fetchFeatures = async (
    type: keyof FeatureUrlFetchType,
): Promise<Feature[]> => {
    const urlKey = FeatureUrlKeys[type]

    const url = Urls[urlKey as keyof typeof Urls]
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Failed to fetch ${type} features`)
    }

    return response.json() as Promise<Feature[]>
}

export const formatAuthors = (authors: Dev[]): string => {
    const names = authors.map((author) => author.name)

    switch (names.length) {
        case 0:
            return ''
        case 1:
            return names[0]
        case 2:
            return names.join(' & ')
        default:
            return names.join(', ')
    }
}

export const formatTarget = (target: FeatureTarget): string =>
    target
        ? target
              .replace(/([A-Z])/g, ' $1')
              .toLowerCase()
              .trim()
        : 'all platforms'

export const cleanDescription = (text: string): string =>
    text
        .replace(/[!.,:;?]+/g, '')
        .replace(/\s+/g, ' ')
        .trim()

export const getAvailabilityText = (
    name: string,
    required: boolean,
    target: FeatureTarget,
): string => {
    if (name === 'WebContextMenus') return 'Required on vesktop & adrenalin'

    return required
        ? `Required on ${formatTarget(target)}`
        : `Available on ${formatTarget(target)}`
}
