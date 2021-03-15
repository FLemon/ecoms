import React, { useState, useEffect } from  'react';
import Router from 'next/router'
import ReactGA from 'react-ga'

const TrackingID = process.env.GA_ID

const TrackingContext = React.createContext();

const TrackingProvider = (props) => {
  const { userIdThatMightChange } = props

  const [analytics, setAnalytics] = useState({
    isInitialized: false,
    hasUser: false,
    trackers: ['myDefaultTracker']
  })

  const handleRouteChange = url  => {
    ReactGA.set({ page:  url }, analytics.trackers);
    ReactGA.pageview(url, analytics.trackers);
  };

  useEffect(() => {
    const { isInitialized, hasUser, trackers } = analytics

    if (!isInitialized) {
      ReactGA.initialize(TrackingID, {
        gaOptions: {
          userId: userIdThatMightChange,
        }
      })

      Router.events.on('routeChangeComplete', handleRouteChange);

      setAnalytics(prev => ({
        ...prev,
        isInitialized: true,
        hasUser: Boolean(userIdThatMightChange)
      }));

    } else if (isInitialized && !hasUser) {
      ReactGA.set({ userIdThatMightChange }, trackers)

      setAnalytics(prev => ({
        ...prev,
        hasUser: Boolean(userIdThatMightChange)
      }));
    }

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [userIdThatMightChange])

  return <TrackingContext.Provider {...props} />
}

const useTracking = () => React.useContext(TrackingContext);

export { TrackingProvider, useTracking };
