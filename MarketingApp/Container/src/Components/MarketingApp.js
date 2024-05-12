import React, { useRef, useEffect } from 'react';
import { mount } from 'marketing/MarketingApp';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MarketingApp({ onSignIn }) {
    const ref = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const navigationInitiatedByMicrofrontend = useRef(false);

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: location.pathname, // Send the initial state of the route to the subapp memory history

            onNavigate: ({ pathname: nextPathname }) => {
                if (location.pathname !== nextPathname) {
                    navigationInitiatedByMicrofrontend.current = true;
                    navigate(nextPathname, { replace: true });
                }
            },
            onSignIn,
        });

        // React only to changes in location
        if (navigationInitiatedByMicrofrontend.current) {
            // Reset the flag after handling navigation internally
            navigationInitiatedByMicrofrontend.current = false;
        } else {
            // Sync the microfrontend with the container's location
            console.log(`container: MarketingApp - before sending the navigation of container to marketing:${location.pathname}`)
            onParentNavigate({ pathname: location.pathname });
        }

        return () => {
            // Cleanup logic if necessary when the component unmounts
        };
    }, [navigate, location, onSignIn]);

    return <div ref={ref} />;
}
