import { useLocation, useNavigate } from "react-router-dom"
import { ALL_ROUTES } from "../main";

export default function useNavigator() {
    const navigate = useNavigate();
    return {
        navigateTo: (path: typeof ALL_ROUTES[keyof typeof ALL_ROUTES]["path"]) => navigate(path),
    }
}