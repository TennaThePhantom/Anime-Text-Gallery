import React, { useRef, useState } from "react";
import useMousePosition from "../hooks/useMousePosition.jsx";
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

	const renderContent = () => {
		if (!currentText.type || currentText.type === "main") {
			return (
				<div className={`${fadeState} sub-text-container`}>
					{Object.keys(fateSeriesTextData).map((category, index) => (
						<div
							ref={textRef}
							key={category}
							onMouseLeave={handleGifHoverLeaveOnText}
						>
							<p
								className="sub-text"
								onMouseEnter={() => HandleGifHoverOnText(index)}
								onMouseMove={handleGifMouseMove}
								onClick={() =>
									navigate({ type: "FateCategory", category, level: 1 })
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

		if (currentText.type === "FateCategory" && currentText.level === 1) {
			const categoryData = fateSeriesTextData[currentText.category];

			if (!categoryData) {
				return <div className={fadeState}>No data found</div>;
			}

			if (typeof categoryData === "object" && !Array.isArray(categoryData)) {
				return (
					<div className={`${fadeState} sub-text-container`}>
						{Object.keys(categoryData).map((subCategory, index) => (
							<div
								ref={textRef}
								key={subCategory}
								onMouseLeave={handleGifHoverLeaveOnText}
							>
								<p
									className="sub-text"
									onMouseEnter={() => HandleGifHoverOnText(index)}
									onMouseMove={handleGifMouseMove}
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
								key={text}
								onMouseLeave={handleGifHoverLeaveOnText}
							>
								<p
									className="sub-text"
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
						<div
							ref={textRef}
							key={text}
							onMouseLeave={handleGifHoverLeaveOnText}
						>
							<p
								className="sub-text"
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
						</div>
					))}
				</div>
			);
		}
	};
	return renderContent();
}

export default FateSeriesText;
