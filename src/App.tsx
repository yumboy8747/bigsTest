import React, {useEffect} from 'react'
import { fetcher } from './app/hooks/fetcher'
import { MainRoutes } from './app/mainRoutes'
import { SWRConfig } from 'swr'
import ThemeProvider from './theme/ThemeProvider'
import { NavermapsProvider } from 'react-naver-maps';

const cacheProvider: any = cache => {
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'))

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
  })
  window.addEventListener('pagehide', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
  })

  return map
}

function App() {

  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        provider: cacheProvider,
      }}>
      <ThemeProvider>
        <MainRoutes />
      </ThemeProvider>
    </SWRConfig>
  )
}

export default App;
