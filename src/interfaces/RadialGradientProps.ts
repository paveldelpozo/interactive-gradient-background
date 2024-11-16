export interface RadialGradientProps {
    color: string
    circleSize: number|string
    origin: string
    animation: 'moveVertical' | 'moveHorizontal' | 'moveInCircle'
    animationDuration: number
    animationMode: string
    opacity: number
    enabled?: boolean
}
