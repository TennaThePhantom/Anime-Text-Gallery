import "./App.css";
import DarkLightMode from "./assets/components/DarkLightMode.jsx";
import Volume from "./assets/components/Volume.jsx";
import NavigationWrapper from "./assets/components/NavigationWrapper.jsx";


// work on volume component tomorrow 
function App() {
	return (
		<div className="app-component">
			<DarkLightMode/>
			<Volume/>
			<div className="text-container">
				<NavigationWrapper/>
			</div>
		</div>
	);
}

export default App;
