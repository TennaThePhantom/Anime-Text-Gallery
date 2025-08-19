import React, { useRef, useState } from "react";
import useMousePosition from "../Hooks/useMousePosition.jsx";
import HoverGifs from "./HoverGifs.jsx";
import { fateSeriesTextData } from "../data/textData.js";

function FateSeriesText({ currentText, navigate, fadeState }) {
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

	if (currentText.type === "FateCategory" && currentText.level === 1) {
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
	if (currentText.type === "FateSubCategory" && currentText.level === 2) {
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
	} else {
		return (
			<div className={`${fadeState} sub-text-container`}>
				{Object.keys(subCategoryData).map((item, index) => (
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

export default FateSeriesText;
