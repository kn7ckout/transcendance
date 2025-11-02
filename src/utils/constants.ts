export const Urls = {
    ALL_FEATURES_URL: '/features.json',
    ADRENALIN_FEATURES_URL: '/features.json',
    DISCORD_URL: '/discord',
    GITHUB_URL: 'https://github.com/Adrenalin',
    DISCORD_API: 'https://discord.com/api/v10',
    DISCORD_CDN: 'https://cdn.discordapp.com',
}

export const ownerIds = [
    848339671629299742n, // thor
].map(String)

export const teamIds = [
    1343448272005500980n, // ozas
    1252348477434888299n, // .
].map(String)

export const helperIds = [
    516750892372852754n, // aspy
    755144413411410060n, // drwhofan13
].map(String)

export const teamMembers = [...ownerIds, ...teamIds, ...helperIds]
