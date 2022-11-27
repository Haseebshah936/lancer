import { matchRoutes, useLocation } from "react-router-dom"

const useCurrentPath = ({ routes }) => {
    const location = useLocation()
    const [{ route }] = matchRoutes(routes, location)

    return route.path
}
export default useCurrentPath;