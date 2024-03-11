import { registerRootComponent } from "expo";
import React from "react";
import Navigation from "./navigation";
import { store } from "./redux/app_store";
import { Provider } from "react-redux";

function App():React.JSX.Element {
	return (
		<Provider store={store}>
			<Navigation/>
		</Provider>
	);
}

export default registerRootComponent(App);
