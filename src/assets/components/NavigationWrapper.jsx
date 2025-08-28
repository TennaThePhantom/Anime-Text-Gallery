import React, { useState, useEffect } from "react";
import MainScreenText from "./MainScreenText";
import { COMPONENT_MAP, getTextComponent } from "../data/componentTextMap.js"; // Import from new file
import { MainScreenTextData } from "../data/textData";
import "../CSS/NavigationWrapper.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useAudio } from "../Contexts/AudioContext.jsx";

function NavigationWrapper() {
	const { stopTrack } = useAudio();

	const [isDarkMode, setIsDarkMode] = useState(false);
	const [navigationStack, setNavigationStack] = useState([]);
	const [fadeState, setFadeState] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(null);

	// Dark mode effect
	useEffect(() => {
		const checkUserDarkMode = () => {
			setIsDarkMode(document.documentElement.classList.contains("dark"));
		};

		checkUserDarkMode();
		const darkModeObserver = new MutationObserver(checkUserDarkMode);
		darkModeObserver.observe(document.documentElement, { attributes: true });

		return () => darkModeObserver.disconnect();
	}, []);

	const navigate = (newIndex) => {
		setFadeState("fade-out");
		setTimeout(() => {
			setNavigationStack((prev) => [...prev, newIndex]);
			setFadeState("fade-in");
		}, 500);
	};

	const goBack = () => {
		setFadeState("fade-out");
		if (navigationStack.length === 1) {
			stopTrack();
		}
		setTimeout(() => {
			setNavigationStack((prev) => prev.slice(0, -1));
			setSelectedIndex(null);
			setFadeState("fade-in");
		}, 500);
	};

	const handleTextClick = (text, index) => {
		setSelectedIndex(index);
		navigate({ type: "main", text });
	};

	const renderMainScreen = () => {
		return MainScreenTextData.map((text, index) => (
			<MainScreenText
				key={index}
				text={text}
				index={index}
				onClick={() => handleTextClick(text, index)}
				isActive={selectedIndex === index}
			/>
		));
	};

	const renderContent = () => {
		if (navigationStack.length === 0) {
			return renderMainScreen();
		}

		const currentText = navigationStack[navigationStack.length - 1];
		const TextComponent = getTextComponent(currentText.type, currentText.text);

		// If no component is found, returns a fallback text instead of blank content
		if (!TextComponent) {
			console.error(
				`No component found for type: ${currentText.type}, text: ${currentText.text}`
			);
			return <div>Content not found</div>;
		}

		return (
			<TextComponent
				currentText={currentText}
				navigate={navigate}
				fadeState={fadeState}
			/>
		);
	};

	// arrow in the top left corner
	return (
		<div className="navigation-manger">
			{navigationStack.length > 0 && (
				<div
					className={`backButton ${isDarkMode ? "dark" : ""} `}
					onClick={goBack}
				>
					<FontAwesomeIcon
						className={`left-arrow-icon ${isDarkMode ? "dark" : ""}`}
						icon={faArrowLeft}
					/>{" "}
				</div>
			)}
			<div className={`content-container ${fadeState}`}>{renderContent()}</div>
		</div>
	);
}

export default NavigationWrapper;
