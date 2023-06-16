import * as React from 'react';

export const _navigator = React.createRef();

export function navigate(routeName, params) {
    if(!!_navigator)
        _navigator.current.navigate(routeName, params)
    else {
        // console.warn("_navigator not found in NavigationService")
    }
}