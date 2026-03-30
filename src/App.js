import './App.scss'

import { useCore } from 'contexts/core-context'
import { useGlobal } from 'contexts/global-context'
import useEffectOnce from 'hooks/useEffectOnce'
import { Toaster } from 'react-hot-toast'
import Routes from 'Routes'
import { Spinner } from 'ui-toolkit-tailwind/src/components'

function App() {
	const env = process.env.REACT_APP_ENVIRONMENT

	const { isAppReady, initialize } = useCore()
	const { showSpinner } = useGlobal()

	useEffectOnce(initialize)

	return (
		<div className="h-full">
			{env !== 'production' && <div className="env-mode">env: {env}</div>}

			{isAppReady ? <Routes /> : null}

			<Spinner visible={showSpinner} />
			<Toaster />
		</div>
	)
}

export default App
