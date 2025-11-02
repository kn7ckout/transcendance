import { Blocks, Cog } from 'lucide-solid'
import { createSignal, onCleanup, Show } from 'solid-js'

import Button from '@components/UI/Button'
import Dropdown from '@components/UI/Dropdown'

interface Props {
    featureFilter: () => 'all' | 'visual' | 'macros'
    setFeatureFilter: (value: 'all' | 'visual' | 'macros') => void
    platformFilter: () => 'all' | 'desktop' | 'web'
    setPlatformFilter: (value: 'all' | 'desktop' | 'web') => void
    filterHasCommands: () => boolean
    setFilterHasCommands: (value: boolean) => void
    compactMode: () => boolean
    setCompactMode: (value: boolean) => void
}

const Sources = [
    {
        label: 'All',
        value: 'all' as const,
    },
    {
        label: 'Visual',
        icon: (
            <svg class="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
        ),
        value: 'visual' as const,
    },
    {
        label: 'Macros',
        icon: (
            <svg class="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.5 2 6 4.5 6 8v8c0 3.5 2.5 6 6 6s6-2.5 6-6V8c0-3.5-2.5-6-6-6z" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M12 6v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        ),
        value: 'macros' as const,
    }
]

export default function PluginPopover(props: Props) {
    const [open, setOpen] = createSignal(false)

    const toggle = () => setOpen((prev) => !prev)
    const close = () => setOpen(false)

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (!target.closest('.popover-container')) close()
    }

    document.addEventListener('click', handleClickOutside)

    onCleanup(() => document.removeEventListener('click', handleClickOutside))

    return (
        <div class="popover-container relative inline-block">
            <Button
                icon={<Cog size={16} />}
                variant="secondary"
                onClick={toggle}
            >
                Options
            </Button>

            <Show when={open()}>
                <div class="absolute right-0 z-50 mt-2 flex w-68 flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900 p-4 shadow-lg">
                    <Dropdown
                        icon={<Blocks size={16} />}
                        items={Sources.map((item) => ({
                            icon: item.icon,
                            label: item.label,
                            value: item.value,
                        }))}
                            selected={
                                Sources.find(
                                    (item) => item.value === props.featureFilter(),
                                ) ?? null
                            }
                            onSelect={(item) =>
                                props.setFeatureFilter(item.value as any)
                            }
                        placeholder="Source"
                    />
                </div>
            </Show>
        </div>
    )
}
