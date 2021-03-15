import React, { useState, useEffect } from  'react';
import Router from 'next/router'
import ReactGA from 'react-ga'

const TrackingId = process.env.GA_ID
const TrackingContext = React.createContext();

const TrackingProvider = (props) => {
  const [analytics, setAnalytics] = useState({
    isInitialized: false,
    hasUser: false,
    trackers: ['myDefaultTracker']
  })

  const handleRouteChange = url  => {
    ReactGA.set({ page:  url }, analytics.trackers);
    ReactGA.pageview(url, analytics.trackers);
  };

  const addTracker = (trackerId, trackerName) => {
    if (analytics.isInitialized) {
      ReactGA.addTrackers([
        {
          trackingId: trackerId,
          gaOptions: {
            name: trackerName
          }
        }
      ]);
      setAnalytics((prev) => ({
        ...prev,
        trackers: [...prev.trackers, trackerName]
      }))
    }
  }

  const removeTracker = (trackerName) => {
    if (analytics.isInitialized) {
      setAnalytics((prev) => ({
        ...prev,
        trackers: prev.trackers.filter((tracker) => tracker !== trackerName)
      }))
    }
  }

  const logEvent = ({ category = '', action = '', label = '' }) => {
    if (analytics.isInitialized) {
      ReactGA.event({
        category,
        action,
        label
      }, analytics.trackers)
    }
  }

  useEffect(() => {
    const { isInitialized, hasUser, trackers } = analytics

    if (!isInitialized) {
      ReactGA.initialize(TrackingId, {
        debug: true,
        gaOptions: {
          siteSpeedSampleRate: 100
        }
      })

      Router.events.on('routeChangeComplete', handleRouteChange);

      setAnalytics(prev => ({
        ...prev,
        isInitialized: true,
        hasUser: false
      }));

    } else if (isInitialized && !hasUser) {
      setAnalytics(prev => ({
        ...prev,
        hasUser: false
      }));
    }

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [])

  return <TrackingContext.Provider
    value={{ logEvent, addTracker, removeTracker }}
    {...props} />
}

const useTracking = () => React.useContext(TrackingContext);

export { TrackingProvider, useTracking };
