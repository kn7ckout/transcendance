import Button from '@components/UI/Button'
import Popover from '@components/UI/Popover'
import { A } from '@solidjs/router'
import classNames from 'classnames'
import gsap from 'gsap'
import {
    Book,
    BookMarked,
    CloudFog,
    Code,
    Download,
    DownloadIcon,
    ExternalLink,
    Github,
    Paintbrush,
    Puzzle,
} from 'lucide-solid'
import { createSignal, For, onCleanup, onMount, type JSX } from 'solid-js'

interface NavItem {
    text: string
    href: string
    external?: boolean
}

interface BrowseItem {
    icon: () => JSX.Element
    text: string
    description: string
    href: string
    external?: boolean
}

interface BrowseSection {
    category: string
    items: BrowseItem[]
}

const BrowseSections: BrowseSection[] = [
    {
        category: 'Discover',
        items: [
            {
                icon: () => <Puzzle size={20} />,
                text: 'Features',
                description: "List of Adrenalin's features",
                href: '/features',
            },
            {
                icon: () => <BookMarked size={20} />,
                text: 'Homepage',
                description: "Return to the main page",
                href: '/',
            },
        ],
    },
    {
        category: 'Community',
        items: [
            {
                icon: () => (
                    <svg class="h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                ),
                text: 'Discord',
                description: 'Join the active community on Discord',
                href: 'https://discord.gg/7XVU9aTXue',
                external: true,
            },
        ],
    },
]

const NavItems: NavItem[] = [
    {
        text: 'Team',
        href: '/team',
    },
]

const DropdownItem = (props: { item: BrowseItem; onClick?: () => void }) => (
    <A
        href={props.item.href}
        target={props.item.external ? '_blank' : undefined}
        onClick={props.onClick}
        class="relative group flex items-start opacity-60 hover:opacity-100 transition-opacity gap-3 rounded-xl p-3"
    >
        <div class="flex items-center justify-center pt-2">
            {props.item.icon()}
        </div>

        <div class="flex flex-1 flex-col">
            <h4 class="font-semibold text-white">{props.item.text}</h4>
            <p class="text-sm font-semibold text-neutral-400">
                {props.item.description}
            </p>
        </div>

        <div class="-z-10 absolute size-full inset-0 rounded-xl bg-neutral-800 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 transition-all" />
    </A>
)

const NavLink = (props: { item: NavItem }) => (
    <A
        href={props.item.href}
        target={props.item.external ? '_blank' : undefined}
        class="flex cursor-pointer items-center hover:bg-neutral-900 py-2 px-3 rounded-xl gap-1 font-medium text-neutral-400 transition-colors hover:text-white"
    >
        {props.item.text}
        {props.item.external && <ExternalLink size={16} />}
    </A>
)

export default function Navbar() {
    const [showMobileMenu, setShowMobileMenu] = createSignal(false)
    const [hasScrolled, setHasScrolled] = createSignal(false)
    let mobileMenuRef: HTMLDivElement | undefined

    const toggleMobileMenu = (force?: boolean) => {
        const next = force ?? !showMobileMenu()
        setShowMobileMenu(next)
        document.body.style.overflowY = next ? 'hidden' : 'auto'

        if (mobileMenuRef)
            gsap.to(mobileMenuRef, {
                x: next ? 0 : 400,
                duration: 0.3,
                ease: 'power2.out',
                display: next ? 'flex' : 'none',
            })
    }

    const handleScroll = () => setHasScrolled(window.scrollY > 0)

    onMount(() => window.addEventListener('scroll', handleScroll))
    onCleanup(() => {
        window.removeEventListener('scroll', handleScroll)
        document.body.style.overflowY = 'auto'
    })

    return (
        <>
            {showMobileMenu() && (
                <div
                    class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => toggleMobileMenu(false)}
                />
            )}

            <div
                ref={mobileMenuRef}
                class="fixed top-0 right-0 z-40 h-dvh w-80 flex-col overflow-y-scroll border-l border-l-neutral-800/50 bg-neutral-900 md:hidden"
                style={{ display: 'none' }}
            >
                <div class="flex flex-col gap-6 p-6 pt-20">
                    <For each={BrowseSections}>
                        {(section) => (
                            <div class="flex flex-col">
                                <div class="mb-2 font-bold">
                                    {section.category}
                                </div>
                                <For each={section.items}>
                                    {(item) => (
                                        <DropdownItem
                                            item={item}
                                            onClick={() =>
                                                toggleMobileMenu(false)
                                            }
                                        />
                                    )}
                                </For>
                            </div>
                        )}
                    </For>

                    <div class="flex flex-col gap-2 border-t border-neutral-800 pt-4">
                        <For each={NavItems}>
                            {(item) => (
                                <A
                                    href={item.href}
                                    target={
                                        item.external ? '_blank' : undefined
                                    }
                                    class="flex items-center gap-1 rounded-xl p-3 font-bold hover:bg-neutral-800/50"
                                    onClick={() => toggleMobileMenu(false)}
                                >
                                    {item.text}
                                    {item.external && (
                                        <ExternalLink size={16} />
                                    )}
                                </A>
                            )}
                        </For>

                        <A
                            href="/download"
                            onClick={() => toggleMobileMenu(false)}
                        >
                            <Button
                                icon={<Download size={16} />}
                                variant="secondary"
                                class="w-full justify-center"
                            >
                                Download
                            </Button>
                        </A>
                    </div>
                </div>
            </div>

            <header
                class={classNames(
                    'max-w-eq-lg z-30 mx-auto flex items-center justify-center px-6 py-8 transition-colors',
                    hasScrolled() &&
                        'sticky top-0 bg-neutral-950/90 backdrop-blur-lg',
                )}
            >
                <div class="flex items-center gap-6">
                    <A
                        href="/"
                        class="flex items-center gap-3 text-lg font-bold text-white transition-transform active:scale-[.95]"
                    >
                        <img
                            src="/assets/file.svg"
                            class="size-8 select-none"
                            draggable={false}
                            alt="Adrenalin logo"
                        />
                        Adrenalin.
                    </A>

                    <hr class="max-lg:hidden border-r h-8 border-neutral-900" />

                    <div class="hidden items-center gap-3 lg:flex">
                        <For each={BrowseSections}>
                            {(section) => (
                                <Popover
                                    trigger={
                                        <span class="cursor-pointer text-neutral-400 hover:text-white transition-colors font-medium">
                                            {section.category}
                                        </span>
                                    }
                                    popoverClass="left-1/2 -translate-x-1/3 w-[240px] p-3"
                                >
                                    <div class="flex flex-col gap-2">
                                        <For each={section.items}>
                                            {(item) => (
                                                <DropdownItem item={item} />
                                            )}
                                        </For>
                                    </div>
                                </Popover>
                            )}
                        </For>

                        <For each={NavItems}>
                            {(item) => <NavLink item={item} />}
                        </For>
                    </div>

                    <A href="/download" class="hidden md:flex ml-6">
                        <Button icon={<Download size={16} />} variant="primary">
                            Download
                        </Button>
                    </A>
                </div>

                <button
                    class="z-50 flex size-12 flex-col items-center justify-center gap-1.5 rounded-xl md:hidden absolute right-6"
                    onClick={() => toggleMobileMenu()}
                >
                    <span
                        class={classNames(
                            showMobileMenu() && 'translate-y-2 rotate-45',
                            'h-0.5 w-5 rounded-full bg-neutral-200 transition-all',
                        )}
                    />
                    <span
                        class={classNames(
                            showMobileMenu() && 'opacity-0',
                            'h-0.5 w-5 rounded-full bg-neutral-200 transition-all',
                        )}
                    />
                    <span
                        class={classNames(
                            showMobileMenu() && '-translate-y-2 -rotate-45',
                            'h-0.5 w-5 rounded-full bg-neutral-200 transition-all',
                        )}
                    />
                </button>
            </header>
        </>
    )
}
