import { useLocation, useNavigate } from "react-router";
import { ALL_ROUTES } from "../main";

export default function useNavigator() {
    const navigate = useNavigate();
    return {
        navigateTo: (path: string) => navigate(path),
    }
}