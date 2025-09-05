import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import {Amplify} from 'aws-amplify'
import awsmobile from './aws-exports.js'

Amplify.configure(awsmobile);

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
    </AuthProvider>
)
