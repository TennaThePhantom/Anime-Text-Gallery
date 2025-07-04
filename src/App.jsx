import "./App.css";
import { MainScreenTextData } from "./assets/data/textData.js";
import MainScreenText from "./assets/components/MainScreenText.jsx";
import DarkLightMode from "./assets/components/DarkLightMode.jsx";
import Volume from "./assets/components/volume.jsx";

// work on volume component tomorrow 
function App() {
	return (
		<div className="app-component">
			<DarkLightMode/>
			<Volume/>
			<div className="text-container">
				{/* currently display the text for the anime gallery*/}
				{MainScreenTextData.map((text, index) => (
					<MainScreenText key={index} text={text} index={index} />
				))}
			</div>
		</div>
	);
}

export default App;
