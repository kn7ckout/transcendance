import { A } from '@solidjs/router'
import { createSignal } from 'solid-js'

import Button from '@components/UI/Button'
import Switch from '@components/UI/Switch'
import { Globe, Puzzle } from 'lucide-solid'

interface PluginProps {
    title: string
    description: string
}

function AdrenalinFeature(props: PluginProps) {
    const [enabled, setEnabled] = createSignal<boolean>(false)

    return (
        <div class="relative w-full max-w-92 rounded-xl bg-neutral-900 px-4 py-6 md:px-6">
            <div class="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/20 backdrop-blur-md border border-white/10">
                <div class="text-center">
                    <div class="text-xl font-bold text-white tracking-wide">
                        Placeholder
                    </div>
                </div>
            </div>
            
            <div class="flex items-center justify-between">
                <h1 class="text-lg font-bold">{props.title}</h1>

                <Switch
                    onclick={() => setEnabled(!enabled())}
                    checked={enabled()}
                />
            </div>

            <p class="text-sm font-medium text-neutral-400">
                {props.description}
            </p>
        </div>
    )
}

export default function FeaturePlugins() {
    return (
        <div class="flex justify-between gap-6 max-md:flex-col">
            <div class="flex w-full flex-col gap-6 rounded-xl bg-neutral-900 px-8 py-12 md:w-2/3 md:justify-between">
                <div class="flex flex-col gap-2">
                    <span class="flex items-center gap-2 text-xl font-semibold">
                        <Puzzle fill="#ffffff10" size={24} />
                        Features
                    </span>

                    <p class="font-medium text-neutral-400">
                        Access a wide variety of features, ranging from Instant Lethal to Instant twisted seamlessly.
                    </p>
                </div>

                <A href="/features" class="w-fit">
                    <Button variant="secondary" icon={<Globe size={16} />}>
                        Explore Features
                    </Button>
                </A>
            </div>

            <div class="flex w-full flex-col items-center justify-center py-6 max-md:px-8 max-sm:gap-3">
            <div class="opacity-50 md:translate-y-3 lg:translate-x-24">
                <AdrenalinFeature
                    title="Placeholder"
                    description="Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder"
                />
            </div>

            <div class="-translate-y-6 shadow-lg md:-translate-y-3 lg:-translate-x-24">
                <AdrenalinFeature
                    title="Placeholder"
                    description="Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder"
                />
            </div>
            </div>
        </div>
    )
}
