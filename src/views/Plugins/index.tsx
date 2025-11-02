import { useSearchParams } from '@solidjs/router'
import {
    createEffect,
    createMemo,
    createResource,
    createSignal,
    For,
    onCleanup,
    onMount,
    Show,
} from 'solid-js'

import { fetchFeatures } from '@utils/plugin'
import { getStored, setStored } from '@utils/storage'

import { Puzzle, RotateCcw, Search, SearchX } from 'lucide-solid'

import Button from '@components/UI/Button'
import Input from '@components/UI/Input'

import PageBootstrap from '@components/PageBootstrap'
import PluginCard from './components/PluginCard'
import PluginPopover from './components/PluginPopover'

type FeatureFilter = 'all' | 'visual' | 'macros'
type PlatformFilter = 'all' | 'desktop' | 'web'

const INITIAL_VISIBLE_COUNT = 18
const LOAD_MORE_COUNT = 9
const LOAD_MORE_THRESHOLD = 300

export default function Features() {
    const [features, { refetch }] = createResource(() => fetchFeatures('all'))
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = createSignal(searchParams.search || '')

    const [compactMode, setCompactMode] = createSignal(
        getStored<boolean>('compactMode', true),
    )
    const [featureFilter, setFeatureFilter] = createSignal<FeatureFilter>(
        (searchParams.source as FeatureFilter) || 'all',
    )
    const [platformFilter, setPlatformFilter] = createSignal<PlatformFilter>(
        (searchParams.platform as PlatformFilter) || 'all',
    )
    const [filterHasCommands, setFilterHasCommands] = createSignal(
        searchParams.commands === 'true',
    )

    const [visibleCount, setVisibleCount] = createSignal(INITIAL_VISIBLE_COUNT)

    createEffect(() => {
        setStored('compactMode', compactMode())
        setSearchParams({
            search: search() || undefined,
            source: featureFilter() !== 'all' ? featureFilter() : undefined,
        })
    })

    const updateSearch = (value: string) => {
        setSearch(value)
        setVisibleCount(INITIAL_VISIBLE_COUNT)
    }

    const filteredFeatures = createMemo(() => {
        const featureList = features()
        if (!featureList) return []

        let result = [...featureList]

        const searchQuery = search()
        const query = (
            Array.isArray(searchQuery)
                ? (searchQuery[0] ?? '')
                : (searchQuery ?? '')
        )
            .toLowerCase()
            .trim()

        if (query) {
            result = result.filter((feature) => {
                const nameMatch = feature.name.toLowerCase().includes(query)
                const authorMatch = feature.authors.some((author) =>
                    author.name.toLowerCase().includes(query),
                )

                return nameMatch || authorMatch
            })
        }

        if (featureFilter() === 'visual') {
            result = result.filter((feature) =>
                feature.tags.includes('visual') || feature.tags.includes('effects') || feature.tags.includes('dashbars')
            )
        } else if (featureFilter() === 'macros') {
            result = result.filter((feature) =>
                feature.tags.includes('macro') || feature.tags.includes('combat') || feature.tags.includes('movement')
            )
        }

        return result.sort((a, b) => a.name.localeCompare(b.name))
    })

    const visibleFeatures = createMemo(() =>
        filteredFeatures().slice(0, visibleCount()),
    )

    const hasMoreFeatures = createMemo(
        () => visibleCount() < filteredFeatures().length,
    )

    const handleScroll = () => {
        const { innerHeight, scrollY } = window
        const { offsetHeight } = document.body

        if (
            innerHeight + scrollY >= offsetHeight - LOAD_MORE_THRESHOLD &&
            hasMoreFeatures()
        ) {
            setVisibleCount((count) => count + LOAD_MORE_COUNT)
        }
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
    })

    onCleanup(() => {
        window.removeEventListener('scroll', handleScroll)
    })

    return (
        <PageBootstrap
            meta={{ title: 'Features' }}
            fullWidth
            icon={<Puzzle />}
            title="Features"
                description={`${filteredFeatures().length} feature${filteredFeatures().length !== 1 ? 's' : ''} found`}
        >
            <div class="flex items-center gap-3">
                <Input
                    placeholder="Search features..."
                    value={search()}
                    onInput={(e) => updateSearch(e.currentTarget.value)}
                    icon={<Search size={18} />}
                    class="flex-1 py-1.5"
                />
                <PluginPopover
                    featureFilter={featureFilter}
                    setFeatureFilter={setFeatureFilter}
                    platformFilter={platformFilter}
                    setPlatformFilter={setPlatformFilter}
                    filterHasCommands={filterHasCommands}
                    setFilterHasCommands={setFilterHasCommands}
                    compactMode={compactMode}
                    setCompactMode={setCompactMode}
                />
            </div>

            <main class="w-full">
                <Show
                    when={!features.loading && !features.error}
                    fallback={
                        <div class="flex items-center justify-center py-12">
                            <Show
                                when={features.error}
                                fallback={
                                    <div class="flex flex-col items-center gap-2">
                                        <div class="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-sky-500"></div>

                                        <p class="text-sm font-bold text-sky-200">
                                            Loading features
                                        </p>
                                    </div>
                                }
                            >
                                <div class="flex flex-col items-center gap-2">
                                    <p class="text-sm font-bold text-red-400">
                                        Failed to load features
                                    </p>
                                    <Button
                                        variant="red"
                                        icon={<RotateCcw size={16} />}
                                        onClick={() => refetch()}
                                    >
                                        Retry
                                    </Button>
                                </div>
                            </Show>
                        </div>
                    }
                >
                    <Show
                        when={filteredFeatures().length > 0}
                        fallback={
                            <div class="flex flex-col items-center justify-center gap-1 py-12 text-neutral-200">
                                <SearchX size={48} class="text-neutral-500" />

                                <p class="text-lg font-bold">
                                    No features found.
                                </p>

                                <p class="max-w-92 text-center font-medium text-neutral-300">
                                    Try adjusting your search or filters to find
                                    what you are looking for.
                                </p>
                            </div>
                        }
                    >
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <For each={visibleFeatures()}>
                                    {(feature) => (
                                        <PluginCard
                                            variant={
                                                compactMode() ? 'compact' : 'normal'
                                            }
                                            {...feature}
                                        />
                                    )}
                                </For>
                            </div>

                            <Show when={hasMoreFeatures()}>
                                <div class="mt-8 flex justify-center">
                                    <p class="text-sm text-neutral-400">
                                        Showing {visibleFeatures().length} of{' '}
                                        {filteredFeatures().length} features • Scroll
                                        down to load more
                                    </p>
                                </div>
                            </Show>
                    </Show>
                </Show>
            </main>
        </PageBootstrap>
    )
}
