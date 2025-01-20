import React from 'react';
import { Layout, theme, Result } from 'antd';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Home from "./pages/Home.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";
import Navbar from "./components/Navbar.jsx";
import Services from "./pages/Services.jsx";
import NginxConfigs from "./pages/NginxConfigs.jsx";

const ErrorBoundaryLayout = () => (
    <ErrorBoundary FallbackComponent={<Result
        status="error"
        title="Something Went Wrong"
        subTitle="Please restart the application."
    />}>
        <Outlet />
    </ErrorBoundary>
);

const router = createBrowserRouter([
    {
        element: <ErrorBoundaryLayout />,
        children:[
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/settings",
                element: <Settings />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/services",
                element: <Services />
            },
            {
                path: "/nginx",
                element: <NginxConfigs />
            },
        ]
    }
]);

const App = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
            <Layout>
                <Layout.Content
                    style={{
                        margin: '24px',
                        overflow: 'initial',
                        height:"100%"
                    }}
                >
                    <div
                        style={{
                            padding: 10,
                            textAlign: 'center',
                            minHeight:"90vh",
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Navbar />
                        <RouterProvider router={router} />
                    </div>
                </Layout.Content>
            </Layout>

    );
};
export default App;