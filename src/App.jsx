import "./App.css";
import DarkLightMode from "./assets/components/DarkLightMode.jsx";
import Volume from "./assets/components/Volume.jsx";
import NavigationWrapper from "./assets/components/NavigationWrapper.jsx";
import { AudioProvider } from "./assets/contexts/AudioContext.jsx";
import MobileAppWarning from "./assets/components/MobileAppWarning.jsx";
import { useState, useEffect } from "react";

function App() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	useEffect(() => {
		const checkUserDarkMode = () => {
			// checks the html document class for dark class
			setIsDarkMode(document.documentElement.classList.contains("dark"));
		};
		// checks if the user has dark mode enabled in their system on initial load once
		checkUserDarkMode();

		// watches for changes in the document's class attribute to detect dark mode changes
		const darkModeObserver = new MutationObserver(checkUserDarkMode);
		darkModeObserver.observe(document.documentElement, { attributes: true });

		return () => darkModeObserver.disconnect(); // cleanup observer on component(to make sure there's no memory leak)
	}, []);
	return (
		<AudioProvider>
			<div className={`app-component ${isDarkMode ? "dark" : ""}`}>
				<MobileAppWarning />
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
