import { createSignal, onMount, onCleanup, type Component } from 'solid-js'
import DefaultCursor from './DefaultCursor'

interface Position {
    x: number
    y: number
}

interface SmoothCursorProps {
    cursor?: Component
    springConfig?: {
        damping: number
        stiffness: number
        mass: number
        restDelta: number
    }
}

export default function SmoothCursor(props: SmoothCursorProps = {}) {
    const CursorComponent = props.cursor || DefaultCursor
    
    const springConfig = props.springConfig || {
        damping: 45,
        stiffness: 400,
        mass: 1,
        restDelta: 0.001,
    }

    const [isMoving, setIsMoving] = createSignal(false)
    const [lastMousePos, setLastMousePos] = createSignal<Position>({ x: 0, y: 0 })
    const [velocity, setVelocity] = createSignal<Position>({ x: 0, y: 0 })
    const [lastUpdateTime, setLastUpdateTime] = createSignal(Date.now())
    const [previousAngle, setPreviousAngle] = createSignal(0)
    const [accumulatedRotation, setAccumulatedRotation] = createSignal(0)

    const [cursorX, setCursorX] = createSignal(0)
    const [cursorY, setCursorY] = createSignal(0)
    const [rotation, setRotation] = createSignal(0)
    const [scale, setScale] = createSignal(1)

    let rafId: number | undefined

    function updateVelocity(currentPos: Position) {
        const currentTime = Date.now()
        const deltaTime = currentTime - lastUpdateTime()

        if (deltaTime > 0) {
            setVelocity({
                x: (currentPos.x - lastMousePos().x) / deltaTime,
                y: (currentPos.y - lastMousePos().y) / deltaTime,
            })
        }

        setLastUpdateTime(currentTime)
        setLastMousePos(currentPos)
    }

    function smoothMouseMove(e: MouseEvent) {
        const currentPos = { x: e.clientX, y: e.clientY }
        updateVelocity(currentPos)

        const vel = velocity()
        const speed = Math.sqrt(Math.pow(vel.x, 2) + Math.pow(vel.y, 2))

        setCursorX(currentPos.x)
        setCursorY(currentPos.y)

        if (speed > 0.1) {
            const currentAngle = Math.atan2(vel.y, vel.x) * (180 / Math.PI) + 90

            let angleDiff = currentAngle - previousAngle()
            if (angleDiff > 180) angleDiff -= 360
            if (angleDiff < -180) angleDiff += 360
            
            setAccumulatedRotation(accumulatedRotation() + angleDiff)
            setRotation(accumulatedRotation())
            setPreviousAngle(currentAngle)

            setScale(0.95)
            setIsMoving(true)

            setTimeout(() => {
                setScale(1)
                setIsMoving(false)
            }, 150)
        }
    }

    function throttledMouseMove(e: MouseEvent) {
        if (rafId) return

        rafId = requestAnimationFrame(() => {
            smoothMouseMove(e)
            rafId = undefined
        })
    }

    onMount(() => {
        document.body.style.cursor = 'none'
        window.addEventListener('mousemove', throttledMouseMove)
    })

    onCleanup(() => {
        if (rafId) cancelAnimationFrame(rafId)
        document.body.style.cursor = 'default'
        window.removeEventListener('mousemove', throttledMouseMove)
    })

    return (
        <div
            class="fixed pointer-events-none z-[100] will-change-transform transition-transform duration-75 ease-out"
            style={{
                left: `${cursorX()}px`,
                top: `${cursorY()}px`,
                transform: `translate(-50%, -50%) rotate(${rotation()}deg) scale(${scale()})`,
            }}
        >
            <CursorComponent />
        </div>
    )
}
