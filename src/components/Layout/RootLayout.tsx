import Footer from '@components/Layout/Footer'
import Navbar from '@components/Layout/Navbar'
import SmoothCursor from '@components/UI/SmoothCursor'
import type { ParentProps } from 'solid-js'

export default function RootLayout({ children }: ParentProps) {
    return (
        <>
            <SmoothCursor />
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
