import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import {Amplify} from 'aws-amplify'
import { signInWithRedirect, signOut } from "aws-amplify/auth";
Amplify.configure({
    Auth:{
        Cognito: {
        userPoolId: "ap-south-1_WfTVIuC0l",             // from Outputs
        userPoolClientId: "509ba3lhqgfrueklt9gihc6rc", // from Outputs
        region: "ap-south-1" ,                          // from Output,
        loginWith: {
            oauth: {
            domain: "sam-app-dev.auth.ap-south-1.amazoncognito.com", // from HostedUIDomain Output
            scopes: ["openid", "email", "profile"],
            redirectSignIn: ["https://main.d2va1lk6qgvlk8.amplifyapp.com/dashboard"],  // same as FrontendUrl param
            redirectSignOut: ["https://main.d2va1lk6qgvlk8.amplifyapp.com/signin"], // same as FrontendUrl param
            responseType: "code"
            }
        }
        }
    }
});

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
    </AuthProvider>
)
