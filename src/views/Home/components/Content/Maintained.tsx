import { TrafficCone } from 'lucide-solid'

export default function FeatureMaintained() {
    return (
        <div class="flex justify-center">
            <div class="flex w-full max-w-2xl flex-col gap-6 rounded-xl bg-neutral-900 px-8 py-12 text-center">
                <div class="flex flex-col gap-2">
                    <span class="flex items-center justify-center gap-2 text-xl font-semibold">
                        <TrafficCone fill="#ffffff10" size={24} />
                        Actively Maintained
                    </span>

                    <p class="font-medium text-neutral-400">
                        Active maintenance ensures every feature remains safe and
                        compatible with any Roblox update.
                    </p>
                </div>

            </div>
        </div>
    )
}
