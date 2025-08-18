import React, { useRef, useState } from "react";
import useMousePosition from "../Hooks/useMousePosition.jsx";
import HoverGifs from "./HoverGifs.jsx";
import { BleachTextData } from "../data/textData.js";

function BleachText({ currentText, navigate, fadeState }) {
	const [isHovered, setIsHovered] = useState(false);
	const textRef = useRef(null);
	const { mousePosition, handleGifMouseMove } = useMousePosition(textRef);

	const HandleGifHoverOnText = (index) => {
		setIsHovered(index);
	};

	const handleGifHoverLeaveOnText = () => {
		setIsHovered(null);
	};

	if (!currentText.type || currentText.type === "main") {
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
	if (currentText.type === "bleachCategory" && currentText.level === 1) {
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

	if (currentText.type === "bleachSubCategory" && currentText.level === 2) {
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

	if (currentText.type === "thirdBleachCategory" && currentText.level === 3) {
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
	} else {
        // fall back for deeper levels highly unlikely to be used
		return (
			<div className={`${fadeState} sub-text-container`}>
				{Object.keys(thirdCategoryData).map((item, index) => (
					<div
						ref={textRef}
						onMouseLeave={handleGifHoverLeaveOnText}
						key={item}
					>
						<p
							className="sub-text"
							onMouseEnter={() => HandleGifHoverOnText(index)}
							onMouseMove={handleGifMouseMove}
						>
							{item}
						</p>
					</div>
				))}
			</div>
		);
	}
    
}

export default BleachText;
