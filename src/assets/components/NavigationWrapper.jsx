import React, { useState, useEffect, useRef } from "react";
import MainScreenText from "./MainScreenText";
import {
	SoloLevelingTextData,
	MainScreenTextData,
	KurukoBasketballTextData,
	DragonBallTextData,
} from "../data/textData";
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
				<div
					className={fadeState}
					ref={textRef}
					onMouseLeave={handleGifHoverLeaveOnText}
				>
					{SoloLevelingTextData.map((text, index) => (
						<p
							className="sub-text"
							key={text}
							onMouseEnter={() => HandleGifHoverOnText(index)}
							onMouseMove={handleGifMouseMove}
						>
							{text}
							<HoverGifs
								text={text}
								index={index}
								isActive={isHovered === index}
								textContainerRef={textRef}
								mousePosition={mousePosition}
							/>
						</p>
					))}
				</div>
			);
		}
		if (
			currentText.type === "main" &&
			currentText.text === "Kuruko's Basketball"
		) {
			return (
				<div className={`${fadeState} sub-text-container`}>
					{Object.keys(KurukoBasketballTextData).map((category, index) => (
						<div
							ref={textRef}
							onMouseLeave={handleGifHoverLeaveOnText}
							key={category}
						>
							<p
								className="sub-text"
								onMouseEnter={() => HandleGifHoverOnText(index)}
								onMouseMove={handleGifMouseMove}
								onClick={() =>
									navigate({ type: "category", category, level: 1 })
								}
							>
								{category}
								<HoverGifs
									text={category}
									index={index}
									isActive={isHovered === index}
									textContainerRef={textRef}
									mousePosition={mousePosition}
								/>
							</p>
						</div>
					))}
				</div>
			);
		}

		if (currentText.type === "category") {
			const categoryData = KurukoBasketballTextData[currentText.category];

			if (!categoryData) {
				return <div className={fadeState}>No data found</div>;
			}

			if (typeof categoryData === "object" && !Array.isArray(categoryData)) {
				return (
					<div className={`${fadeState}  sub-text-container`}>
						{Object.keys(categoryData).map((subCategory, index) => (
							<div
								ref={textRef}
								onMouseLeave={handleGifHoverLeaveOnText}
								key={subCategory}
							>
								<p
									className="sub-text"
									key={subCategory}
									onClick={() =>
										navigate({
											type: "subcategory",
											category: currentText.category,
											subCategory,
											level: 2,
										})
									}
								>
									{subCategory}
									<HoverGifs
										text={subCategory}
										index={index}
										isActive={isHovered === index}
										textContainerRef={textRef}
										mousePosition={mousePosition}
									/>
								</p>
							</div>
						))}
					</div>
				);
			} else {
				return (
					<div className={`${fadeState} sub-text-container`}>
						{categoryData.map((text, index) => (
							<div
								ref={textRef}
								onMouseLeave={handleGifHoverLeaveOnText}
								key={text}
							>
								<p className="sub-text">{text}</p>
								<HoverGifs
									text={text}
									index={index}
									isActive={isHovered === index}
									textContainerRef={textRef}
									mousePosition={mousePosition}
								/>
							</div>
						))}
					</div>
				);
			}
		}

		if (currentText.type === "subcategory") {
			const subCategoryData =
				KurukoBasketballTextData[currentText.category]?.[
					currentText.subCategory
				];

			if (!subCategoryData) {
				return <div className={fadeState}>No subcategory data found</div>;
			}

			return (
				<div className={fadeState}>
					{subCategoryData.map((text, index) => (
						<div
							ref={textRef}
							onMouseLeave={handleGifHoverLeaveOnText}
							key={text}
						>
							<p className="sub-text">
								{text}
								<HoverGifs
									text={text}
									index={index}
									isActive={isHovered === index}
									textContainerRef={textRef}
									mousePosition={mousePosition}
								/>
							</p>
						</div>
					))}
				</div>
			);
		}

		if (currentText.type === "main" && currentText.text === "Dragon Ball") {
			return (
				<div className={`${fadeState} sub-text-container`}>
					{Object.keys(DragonBallTextData).map((category, index) => (
						<div key={category}>
							<p
								className="sub-text"
								onClick={() =>
									navigate({ type: "dragonBallCategory", category, level: 1 })
								}
							>
								{category}
							</p>
						</div>
					))}
				</div>
			);
		}
		if (currentText.type === "dragonBallCategory") {
			const categoryData = DragonBallTextData[currentText.category];

			if (!categoryData) {
				return <div className={fadeState}>No data found</div>;
			}
			return (
				<div className={`${fadeState} sub-text-container`}>
					{categoryData.map((text, index) => (
						<div key={text}>
							<p className="sub-text">{text}</p>
						</div>
					))}
				</div>
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
