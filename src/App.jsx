import "./App.css";
import { MainScreenTextData } from "./assets/data/textData.js";
import MainScreenText from "./assets/components/MainScreenText.jsx";
import DarkLightMode from "./assets/components/DarkLightMode.jsx";
function App() {
	return (
		<div className="app-component">
			<DarkLightMode/>
			<div className="text-container">
				{/* currently display the text for the anime gallery*/}
				{MainScreenTextData.map((text, index) => (
					<MainScreenText key={index} text={text} />
				))}
			</div>
		</div>
	);
}

export default App;
