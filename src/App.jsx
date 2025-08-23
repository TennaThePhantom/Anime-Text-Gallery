import "./App.css";
import DarkLightMode from "./assets/components/DarkLightMode.jsx";
import Volume from "./assets/components/Volume.jsx";
import NavigationWrapper from "./assets/components/NavigationWrapper.jsx";
import { AudioProvider } from "./assets/Contexts/AudioContext";
import MobileAppWaring from "./assets/components/MobileAppWaring.jsx";

// work on volume component tomorrow
function App() {
	return (
		<AudioProvider>
			<div className="app-component">
				<MobileAppWaring />

				<DarkLightMode />
				<Volume />
				<div className="text-container">
					<NavigationWrapper />
				</div>
			</div>
		</AudioProvider>
	);
}

export default App;
