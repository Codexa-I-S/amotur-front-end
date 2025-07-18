import { useEffect } from "react"
import { useMap } from "react-leaflet"

type Props = {
    coords: [number, number]
}

export default function FlyToLocation({coords} : Props) {

    const map = useMap()

    useEffect(() => {
        if (coords) {
            map.flyTo(coords, 18, {duration: 1.5})
        }
    }, [coords] )

    return null

}