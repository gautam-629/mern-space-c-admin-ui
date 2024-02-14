import React from "react";
import ReactDOM from "react-dom/client";

//ant design reset css(default css)
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
     theme={{
      token:{
        colorPrimary: '#F65F42',
        colorLink: '#F65F42',
      }
     }}
    >
    <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
