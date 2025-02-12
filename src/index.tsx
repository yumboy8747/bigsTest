import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './globalStyles.css'

import * as React from 'react'
import * as ReactDOMClient from 'react-dom/client'

// Use consistent styling
import 'sanitize.css/sanitize.css'
import 'react-toastify/dist/ReactToastify.css'
// Import root app

import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // dayjs의 한국어 지원
import advancedFormat from 'dayjs/plugin/advancedFormat'; // 필요한 플러그인 활성화

import { HelmetProvider } from 'react-helmet-async'
import { RecoilRoot } from 'recoil';

import reportWebVitals from './reportWebVitals'

// Initialize languages
import WebFont from 'webfontloader'
import App from './App'

WebFont.load({ google: { families: ['Roboto:300,400,500'] } })
const MOUNT_NODE = document.getElementById('root') as HTMLElement

dayjs.extend(advancedFormat);
dayjs.locale('ko'); // 전역적으로 dayjs의 지역 설정

ReactDOMClient.createRoot(MOUNT_NODE!).render(
  <HelmetProvider>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </HelmetProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
