import React, { useState, useEffect, useRef } from "react";
import MainScreenText from "./MainScreenText";
import KurokoBasketBallText from "./KurokoBasketballText.jsx";
import BleachText from "./BleachText.jsx";
import DragonBallText from "./DragonBallText.jsx";
import BlackCloverText from "./BlackCloverText.jsx";
import FateSeriesText from "./FateSeriesText.jsx";
import SwordArtOnlineText from "./SwordArtOnlineText.jsx";
import SoloLevelingText from "./SoloLevelingText.jsx";

import { MainScreenTextData } from "../data/textData";
import "../CSS/NavigationWrapper.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useMousePosition from "../Hooks/useMousePosition.jsx";
import HoverGifs from "./HoverGifs.jsx";

function NavigationWrapper() {
	const [isDarkMode, setIsDarkMode] = useState(false); // state to manage dark mode
	const [navigationStack, setNavigationStack] = useState([]);
	const [fadeState, setFadeState] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(null);
	const [isHovered, setIsHovered] = useState(false);
	const textRef = useRef(null);

	const { mousePosition, handleGifMouseMove } = useMousePosition(textRef);

	const HandleGifHoverOnText = (index) => {
		setIsHovered(index); // Activates the GIFS Immediately
	};

	const handleGifHoverLeaveOnText = () => {
		setIsHovered(null); // Deactivates the GIFS Immediately
	};

	// dark mode effect
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

	const mainScreenRendering = () => {
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

	const renderText = () => {
		if (navigationStack.length === 0) {
			return mainScreenRendering();
		}
		const currentText = navigationStack[navigationStack.length - 1];

		if (currentText.type === "main" && currentText.text === "Solo Leveling") {
			return (
				<SoloLevelingText currentText={currentText} fadeState={fadeState} />
			);
		}

		if (
			currentText.type === "main" &&
			currentText.text === "Kuruko's Basketball"
		) {
			return (
				<KurokoBasketBallText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}
		if (currentText.type === "kurokoCategory") {
			return (
				<KurokoBasketBallText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}

		if (currentText.type === "kurokoSubCategory") {
			return (
				<KurokoBasketBallText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}

		if (currentText.type === "main" && currentText.text === "Dragon Ball") {
			return (
				<DragonBallText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}
		if (currentText.type === "dragonBallCategory") {
			return (
				<DragonBallText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}

		if (
			currentText.type === "main" &&
			currentText.text === "Sword Art Online"
		) {
			return (
				<SwordArtOnlineText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}

		if (currentText.type === "saoFriends") {
			return (
				<SwordArtOnlineText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}

		if (currentText.type === "main" && currentText.text === "Fate Series") {
			return (
				<FateSeriesText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}

		if (currentText.type === "FateCategory") {
			return (
				<FateSeriesText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}
		if (currentText.type === "FateSubCategory") {
			return (
				<FateSeriesText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}

		if (currentText.type === "main" && currentText.text === "Bleach") {
			return (
				<BleachText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}
		if (currentText.type === "bleachCategory") {
			return (
				<BleachText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}
		if (currentText.type === "bleachSubCategory") {
			return (
				<BleachText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}
		if (currentText.type === "thirdBleachCategory") {
			return (
				<BleachText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}

		if (currentText.type === "main" && currentText.text === "Black Clover") {
			return (
				<BlackCloverText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}

		if (currentText.type === "blackCloverCategory") {
			return (
				<BlackCloverText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}

		if (currentText.type === "blackCloverSubCategory") {
			return (
				<BlackCloverText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}

		if (currentText.type === "blackCloverGroup") {
			return (
				<BlackCloverText
					currentText={currentText}
					navigate={navigate}
					fadeState={fadeState}
				/>
			);
		}
	};

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
			<div className={`content-container ${fadeState}`}>{renderText()}</div>
		</div>
	);
}

export default NavigationWrapper;
