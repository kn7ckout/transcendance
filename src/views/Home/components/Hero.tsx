import { A } from '@solidjs/router'
import gsap from 'gsap'
import { For, onMount } from 'solid-js'

import { Monitor } from 'lucide-solid'

import Button from '@components/UI/Button'

export default function HomeHero() {
    let textRef: HTMLHeadingElement | undefined
    let paragraphRef: HTMLParagraphElement | undefined
    let contentRef: HTMLDivElement | undefined
    let screenRef: HTMLImageElement | undefined

    const headerWords = 'Outplay Your Opponents With Adrenalin.'.split(' ')

    const getPlatform = () => {
        return {
            label: 'Download for Windows',
            href: '/download?platform=windows',
            icon: <Monitor class="size-4" />,
        }
    }

    const platform = getPlatform()

    onMount(() => {
        const tl = gsap.timeline({
            defaults: { ease: 'power3.out', duration: 1 },
        })

        const words = textRef?.querySelectorAll('span')
        const animation = {
            opacity: 0,
            y: 40,
            filter: 'blur(8px)',
            stagger: 0.1,
        }

        if (words && paragraphRef && contentRef && screenRef) {
            tl.from(words, animation)
            tl.from(paragraphRef, animation, '-=0.8')
            tl.from(contentRef, animation, '-=0.8')
            tl.from(
                screenRef,
                {
                    opacity: 0,
                    scale: 0.9,
                    filter: 'blur(12px)',
                },
                '-=0.4',
            )
        }
    })

    return (
        <div class="max-w-eq-lg mx-auto flex flex-col items-center px-6 pt-24">
            <div class="flex max-w-[700px] flex-col items-center justify-center gap-4 text-center">
                <h1
                    ref={textRef}
                    class="text-4xl font-bold text-white lg:text-7xl lg:leading-18"
                >
                    <For each={headerWords}>
                        {(word) => (
                            <span class="mr-2 inline-block">
                                {word === 'Adrenalin.' ? (
                                    <span class="gradient-text">
                                        {word}
                                    </span>
                                ) : (
                                    word
                                )}
                            </span>
                        )}
                    </For>
                </h1>

                <p
                    class="text-lg font-semibold text-neutral-400"
                    ref={paragraphRef}
                >
                    The most advanced TSB Macro.
                </p>

                <div
                    class="mt-6 flex flex-col items-center gap-3"
                    ref={contentRef}
                >
                    <A href={platform.href}>
                        <Button variant="primary" icon={platform.icon}>
                            {platform.label}
                        </Button>
                    </A>

                    <span class="inline-flex items-center gap-1 text-xs font-bold text-neutral-400">
                        Available on <Monitor class="size-3" /> Windows.
                    </span>
                </div>
            </div>

            <img
                ref={screenRef}
                src="/assets/adrenalin-interface.png"
                alt="Adrenalin Software Interface"
                class="mt-12 rounded-t-2xl mask-b-from-75% select-none"
                draggable="false"
            />
        </div>
    )
}
