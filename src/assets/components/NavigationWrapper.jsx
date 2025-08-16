import React, { useState, useEffect, useRef } from "react";
import MainScreenText from "./MainScreenText";
import KurokoBasketBallText from "./KurokoBasketballText.jsx";
import {
	SoloLevelingTextData,
	MainScreenTextData,
	KurukoBasketballTextData,
	DragonBallTextData,
	SwordArtOnlineTextData,
	fateSeriesTextData,
	BleachTextData,
	blackCloverTextData,
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

		if (
			currentText.type === "main" &&
			currentText.text === "Sword Art Online"
		) {
			return (
				<div className={`${fadeState} sub-text-container`}>
					{Object.keys(SwordArtOnlineTextData).map((category, index) => (
						<div key={index}>
							<p
								className="sub-text"
								onClick={() => {
									if (category === "Kirigaya Friends") {
										navigate({ type: "saoFriends", category, level: 1 });
									}
								}}
							>
								{category}
							</p>
						</div>
					))}
				</div>
			);
		}

		if (currentText.type === "saoFriends") {
			const categoryData = SwordArtOnlineTextData[currentText.category];

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

		if (currentText.type === "main" && currentText.text === "Fate Series") {
			return (
				<div className={`${fadeState} sub-text-container`}>
					{Object.keys(fateSeriesTextData).map((category, index) => (
						<div key={index}>
							<p
								className="sub-text"
								onClick={() =>
									navigate({ type: "FateCategory", category, level: 1 })
								}
							>
								{category}
							</p>
						</div>
					))}
				</div>
			);
		}

		if (currentText.type === "FateCategory") {
			const categoryData = fateSeriesTextData[currentText.category];

			if (!categoryData) {
				return <div className={fadeState}>No data found</div>;
			}

			if (typeof categoryData === "object" && !Array.isArray(categoryData)) {
				return (
					<div className={`${fadeState} sub-text-container`}>
						{Object.keys(categoryData).map((subCategory, index) => (
							<div key={index}>
								<p
									className="sub-text"
									onClick={() =>
										navigate({
											type: "FateSubCategory",
											category: currentText.category,
											subCategory,
											level: 2,
										})
									}
								>
									{subCategory}
								</p>
							</div>
						))}
					</div>
				);
			} else {
				return (
					<div className={`${fadeState} sub-text-container`}>
						{categoryData.map((text, index) => (
							<div key={index}>
								<p className="sub-text">{text}</p>
							</div>
						))}
					</div>
				);
			}
		}
		if (currentText.type === "FateSubCategory") {
			const subCategoryData =
				fateSeriesTextData[currentText.category]?.[currentText.subCategory];

			if (!subCategoryData) {
				return <div className={fadeState}>No subcategory data found</div>;
			}
			return (
				<div className={`${fadeState} sub-text-container`}>
					{subCategoryData.map((text, index) => (
						<div key={index}>
							<p className="sub-text">{text}</p>
						</div>
					))}
				</div>
			);
		}

		if (currentText.type === "main" && currentText.text === "Bleach") {
			// displays Gotei 13 Main characters Espades etc
			return (
				<div className={`${fadeState} sub-text-container`}>
					{Object.keys(BleachTextData).map((category, index) => (
						<div key={index}>
							<p
								className="sub-text"
								onClick={() =>
									navigate({ type: "bleachCategory", category, level: 1 })
								}
							>
								{category}
							</p>
						</div>
					))}
				</div>
			);
		}
		if (currentText.type === "bleachCategory") {
			const categoryData = BleachTextData[currentText.category];

			if (!categoryData) {
				return <div className={fadeState}>No data found</div>;
			}
			// handles normal arrays example the main characters array royal guard array etc
			if (Array.isArray(categoryData)) {
				return (
					<div className={`${fadeState} sub-text-container`}>
						{categoryData.map((text, index) => (
							<div key={index}>
								<p className="sub-text">{text}</p>
							</div>
						))}
					</div>
				);
			} else {
				return (
					// handles categories that has categories in them example gotei 13 > old gotei 13, current gotei 13
					<div className={`${fadeState} sub-text-container`}>
						{Object.keys(categoryData).map((subCategory, index) => (
							<div key={index}>
								<p
									className="sub-text"
									onClick={() =>
										navigate({
											type: "bleachSubCategory",
											category: currentText.category,
											subCategory,
											level: 2,
										})
									}
								>
									{subCategory}
								</p>
							</div>
						))}
					</div>
				);
			}
		}

		if (currentText.type === "bleachSubCategory") {
			const subCategoryData =
				BleachTextData[currentText.category]?.[currentText.subCategory];

			if (!subCategoryData) {
				return <div className={fadeState}>No subcategory data found</div>;
			}
			// handles arrays inside sub categories example espades > leaders > Aizen Gin
			if (Array.isArray(subCategoryData)) {
				return (
					<div className={`${fadeState} sub-text-container`}>
						{subCategoryData.map((text, index) => (
							<div key={index}>
								<p className="sub-text">{text}</p>
							</div>
						))}
					</div>
				);
			} else {
				return (
					// handles the third category example: Espades > Members > Espades 1-5
					<div className={`${fadeState} sub-text-container`}>
						{Object.keys(subCategoryData).map((thirdCategory, index) => (
							<div key={index}>
								<p
									className="sub-text"
									onClick={() =>
										navigate({
											type: "thirdBleachCategory",
											category: currentText.category,
											subCategory: currentText.subCategory,
											thirdCategory,
											level: 3,
										})
									}
								>
									{thirdCategory}
								</p>
							</div>
						))}
					</div>
				);
			}
		}

		if (currentText.type === "thirdBleachCategory") {
			const thirdCategoryData =
				BleachTextData[currentText.category]?.[currentText.subCategory]?.[
					currentText.thirdCategory
				];

			if (!thirdCategoryData) {
				return <div className={fadeState}>No group data found</div>;
			}

			return (
				// handles the very last array
				<div className={`${fadeState} sub-text-container`}>
					{thirdCategoryData.map((text, index) => (
						<div key={index}>
							<p className="sub-text">{text}</p>
						</div>
					))}
				</div>
			);
		}

		if (currentText.type === "main" && currentText.text === "Black Clover") {
			return (
				<div className={`${fadeState} sub-text-container`}>
					{Object.keys(blackCloverTextData).map((category) => (
						<div key={category}>
							<p
								className="sub-text"
								onClick={() =>
									navigate({ type: "blackCloverCategory", category, level: 1 })
								}
							>
								{category}
							</p>
						</div>
					))}
				</div>
			);
		}

		if (currentText.type === "blackCloverCategory") {
			const categoryData = blackCloverTextData[currentText.category];

			if (!categoryData) {
				return <div className={fadeState}>No data found</div>;
			}

			if (Array.isArray(categoryData)) {
				// Handle simple arrays (Dark Triad, Eye of the Midnight Sun, Asta Comrades)
				return (
					<div className={`${fadeState} sub-text-container`}>
						{categoryData.map((text) => (
							<div key={text}>
								<p className="sub-text">{text}</p>
							</div>
						))}
					</div>
				);
			} else {
				// Handle nested objects (Black Bulls, Squad Captains, Wizard Kings)
				return (
					<div className={`${fadeState} sub-text-container`}>
						{Object.keys(categoryData).map((key) => {
							// Handle non-clickable items (Secre, Liebe, Julius)
							if (
								currentText.category === "Wizard Kings" &&
								key === "Julius Novachrono"
							) {
								return (
									<div key={key}>
										<p className="sub-text">{key}</p>
									</div>
								);
							}

							// Default clickable behavior for other items
							return (
								<div key={key}>
									<p
										className="sub-text"
										onClick={() => {
											const value = categoryData[key];
											if (Array.isArray(value) || typeof value === "object") {
												navigate({
													type: "blackCloverSubCategory",
													category: currentText.category,
													subCategory: key,
													level: 2,
												});
											}
										}}
									>
										{key}
									</p>
								</div>
							);
						})}
					</div>
				);
			}
		}

		if (currentText.type === "blackCloverSubCategory") {
			const subCategoryData =
				blackCloverTextData[currentText.category]?.[currentText.subCategory];

			if (!subCategoryData) {
				return <div className={fadeState}>No subcategory data found</div>;
			}

			if (Array.isArray(subCategoryData)) {
				return (
					<div className={`${fadeState} sub-text-container`}>
						{subCategoryData.map((text) => (
							<div key={text}>
								<p className="sub-text">{text}</p>
							</div>
						))}
					</div>
				);
			} else {
				return (
					<div className={`${fadeState} sub-text-container`}>
						{Object.keys(subCategoryData).map((group) => {
							if (
								currentText.subCategory === "Members" &&
								["Secre", "Liebe"].includes(group)
							) {
								return (
									<div key={group}>
										<p className="sub-text">{group}</p>
									</div>
								);
							}
							return (
								<div key={group}>
									<p
										className="sub-text"
										onClick={() =>
											navigate({
												type: "blackCloverGroup",
												category: currentText.category,
												subCategory: currentText.subCategory,
												group,
												level: 3,
											})
										}
									>
										{group}
									</p>
								</div>
							);
						})}
					</div>
				);
			}
		}

		if (currentText.type === "blackCloverGroup") {
			const groupData =
				blackCloverTextData[currentText.category]?.[currentText.subCategory]?.[
					currentText.group
				];

			if (!groupData) {
				return <div className={fadeState}>No group data found</div>;
			}

			return (
				<div className={`${fadeState} sub-text-container`}>
					{groupData.map((text) => (
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
