import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import {Amplify} from 'aws-amplify'
import awsconfig from './aws-exports.js'

Amplify.configure(awsconfig);

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
    </AuthProvider>
)
