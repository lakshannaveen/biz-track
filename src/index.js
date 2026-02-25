import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext"; 

// Workaround: suppress benign ResizeObserver loop error in some browsers
// and wrap ResizeObserver callbacks to avoid uncaught exceptions.
if (typeof window !== "undefined") {
  // Suppress the specific ResizeObserver loop error message from surfacing
  window.addEventListener(
    "error",
    (e) => {
      try {
        if (e && e.message && e.message.indexOf("ResizeObserver loop") !== -1) {
          // prevent React error boundary from treating this as app error
          e.stopImmediatePropagation();
        }
      } catch (err) {
        // ignore
      }
    },
    true
  );

  // Wrap ResizeObserver constructor so callbacks are safe
  const RawRO = window.ResizeObserver;
  if (RawRO) {
    const SafeResizeObserver = function (cb) {
      const wrappedCb = function (entries) {
        try {
          cb(entries);
        } catch (err) {
          // swallow to avoid uncaught exceptions from third-party libs
          // console.warn('ResizeObserver callback error', err);
        }
      };
      return new RawRO(wrappedCb);
    };
    // preserve prototype
    SafeResizeObserver.prototype = RawRO.prototype;
    window.ResizeObserver = SafeResizeObserver;
  }
}

// axios.defaults.baseURL = "https://esystems.cdl.lk/backend/BizTrack/";

// axios.defaults.baseURL = "http://localhost:51976/";

// axios.defaults.baseURL = "/";
axios.defaults.baseURL = "https://esystems.cdl.lk/backend-test/BizTrack/";
// axios.defaults.baseURL = "http://172.30.30.110:5000/";
//  axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.get["Accept"] = "application/json";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </Provider>
);

serviceWorkerRegistration.register();
reportWebVitals();
