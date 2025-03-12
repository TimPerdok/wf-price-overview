const EnvConfig: {
    BACKEND_URL: string;
    basename: string
    // @ts-ignore
} = import.meta.env.DEV
        ? {
            basename: "/",
            BACKEND_URL: "http://localhost:2801"
        } : {
            basename: "/wf-price-overview",
            BACKEND_URL: `https://wf-server.onmogeloos.workers.dev`

        }

export default EnvConfig;