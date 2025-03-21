import { Card, CardContent, CardHeader, Button, CircularProgress, Box } from "@mui/material";
import React, { useEffect, useState } from "react";

function formatRelativeTime(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (days > 0) {
        return rtf.format(-days, 'day');
    } else if (hours > 0) {
        return rtf.format(-hours, 'hour');
    } else if (minutes > 0) {
        return rtf.format(-minutes, 'minute');
    } else {
        return rtf.format(-seconds, 'second');
    }
}

export default function LastUpdatedCard({
    lastUpdated,
    isLoading,
    onClick
}: {
    lastUpdated?: Date,
    isLoading: boolean,
    onClick: () => void
}) {
    const [timeAgoString, setTimeAgoString] = useState("")

    useEffect(() => {
        const updateString = () => lastUpdated && setTimeAgoString(formatRelativeTime(lastUpdated))
        updateString()
        const interval = setInterval(updateString, 1000)
        return () => clearInterval(interval)
    })

    return <>
        <Card>
            <CardContent>
                <CardHeader
                    action={
                        <Box sx={{ m: 1, position: 'relative' }}>
                            <Button disabled={isLoading} onClick={onClick}>Refresh</Button>
                            {isLoading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                    }
                    title="Last updated: "
                    subheader={isLoading ? "..." : timeAgoString}
                />
            </CardContent>
        </Card>
    </>
}