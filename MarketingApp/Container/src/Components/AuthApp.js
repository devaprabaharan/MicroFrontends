import React, { useRef, useEffect } from 'react';
import { mount } from 'auth/AuthApp';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AuthApp({ onSignIn }) {
    const ref = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const navigationInitiatedByMicrofrontend = useRef(false);

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: location.pathname,
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
            console.log(`container: Authapp - before sending the navigation of container to auth:${location.pathname}`)
            onParentNavigate({ pathname: location.pathname });
        }

        return () => {
            // Clean up logic if necessary
        };
    }, [navigate, location, onSignIn]);

    return <div ref={ref} />;
}
