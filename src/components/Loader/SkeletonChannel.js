import React from 'react'
import ContentLoader, { Rect } from "react-content-loader/native"

export default function SkeletonChannelLoader(props) {
    return (
        <ContentLoader
            speed={2}
            width={"45%"}
            height={150}
            // viewBox="0 0 100 105"
            backgroundColor="#594079"
            foregroundColor="#899499"
            style={{ marginTop: 20}}
            {...props}
        >
            <Rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
        </ContentLoader>
    )
}
