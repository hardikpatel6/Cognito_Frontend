import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {Amplify} from "aws-amplify"
import { AuthProvider } from './contexts/AuthContext.jsx'
import {awsconfig} from "./aws-exports";

Amplify.configure(awsconfig);

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
    </AuthProvider>
)
