import { useNavigate } from "react-router";

export default function useNavigator() {
    const navigate = useNavigate();
    return {
        navigateTo: (path: string) => navigate(path),
    }
}