import React from 'react'
import ContentLoader, { Rect } from "react-content-loader/native"

export default function SkeletonLoader(props) {
    return (
        <ContentLoader
            speed={2}
            width={"98%"}
            height={105}
            viewBox="0 0 400 105"
            backgroundColor="#594079"
            foregroundColor="#fff"
            {...props}
        >
            <Rect x="145" y="13" rx="3" ry="3" width="88" height="6" />
            <Rect x="145" y="31" rx="3" ry="3" width="52" height="6" />
            <Rect x="145" y="44" rx="3" ry="3" width="206" height="18" />
            <Rect x="5" y="0" rx="10" ry="10" width="30%" height="105" />
        </ContentLoader>
    )
}
