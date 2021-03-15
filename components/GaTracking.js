import React, { useState, useEffect } from  'react';
import Router from 'next/router'
import Head from "next/head"

const GaTracking = (props) => {
  return (
    <>
      {
        process.env.NODE_ENV === "production" && process.browser ?
        <Head>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
          <script async dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());

            gtag("config", ${process.env.NEXT_PUBLIC_GA_ID});`
          }}/>
          {props.children}
        </Head> : null
      }
    </>
  )
}

export { GaTracking }
