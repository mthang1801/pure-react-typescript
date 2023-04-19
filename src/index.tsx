/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import configureStore from "./services/store";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { AuthProvider } from "./services/authorRouter";
import { ConfigProvider } from "antd";
import vi_VN from "antd/es/locale/vi_VN";
const store = configureStore();
Sentry.init({
	dsn: "https://5990fe64225e4bdc94f2e5237d13f10f@o1147147.ingest.sentry.io/6217037",
	integrations: [new BrowserTracing()],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0
});
ReactDOM.render(
	<BrowserRouter>
		<AuthProvider>
			<Provider store={store}>
				<ConfigProvider locale={vi_VN}>
					<App />
				</ConfigProvider>
			</Provider>
		</AuthProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
