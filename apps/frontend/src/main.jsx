import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import ApolloProvider from './apollo/ApolloProvider';

import client from './apollo/client';
import router from './router';
import { AuthProvider } from './context/authContext';



ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <ApolloProvider client={client}>
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
        </ApolloProvider>
    </AuthProvider>
);