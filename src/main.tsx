import React from "react";
import ReactDOM from "react-dom/client";

//ant design reset css(default css)
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import "./index.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
   <QueryClientProvider client={queryClient}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#F65F42',
                        colorLink: '#F65F42',
                    },
                }}>
                <RouterProvider router={router} />
            </ConfigProvider>
        </QueryClientProvider>
  </React.StrictMode>
);
