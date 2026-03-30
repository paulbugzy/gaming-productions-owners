import './index.scss'
import './configs/yupLocale'

import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import CoreProvider from './contexts/core-context'
import GlobalProvider from './contexts/global-context'
import reportWebVitals from './reportWebVitals'

dayjs.extend(quarterOfYear)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<GlobalProvider>
			<CoreProvider>
				<App />
			</CoreProvider>
		</GlobalProvider>
	</BrowserRouter>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
