import React, { useState, useEffect } from  'react';
import Router from 'next/router'
import Head from "next/head"

const GaTracking = () => {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
      <script async dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag("js", new Date());

        gtag("config", '${process.env.NEXT_PUBLIC_GA_ID}');`
      }}/>
    </>
  )
}

export { GaTracking }
