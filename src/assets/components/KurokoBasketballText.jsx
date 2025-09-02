import React, { useRef, useState } from "react";
import useMousePosition from "../hooks/useMousePosition.jsx";
import HoverGifs from "./HoverGifs.jsx";
import { KurukoBasketballTextData } from "../data/textData.js";

function KurokoBasketBallText({ currentText, navigate, fadeState }) {
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
									navigate({
										type: "kurokoCategory",
										category,
										level: 1,
									})
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

		// Level 1 categories
		if (currentText.type === "kurokoCategory" && currentText.level === 1) {
			const categoryData = KurukoBasketballTextData[currentText.category];

			if (!categoryData) {
				return <div className={fadeState}>No category data found</div>;
			}

			if (typeof categoryData === "object" && !Array.isArray(categoryData)) {
				return (
					<div className={`${fadeState} sub-text-container`}>
						{Object.keys(categoryData).map((subCategory, index) => (
							<div
								ref={textRef}
								onMouseLeave={handleGifHoverLeaveOnText}
								key={subCategory}
							>
								<p
									className="sub-text"
									onMouseEnter={() => HandleGifHoverOnText(index)}
									onMouseMove={handleGifMouseMove}
									onClick={() =>
										navigate({
											type: "kurokoSubCategory",
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
				// Simple array of items
				return (
					<div className={`${fadeState} sub-text-container`}>
						{categoryData.map((text, index) => (
							<div
								ref={textRef}
								onMouseLeave={handleGifHoverLeaveOnText}
								key={text}
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

		// Level 2 subcategories
		if (currentText.type === "kurokoSubCategory" && currentText.level === 2) {
			const subCategoryData =
				KurukoBasketballTextData[currentText.category]?.[
					currentText.subCategory
				];

			if (!subCategoryData) {
				return <div className={fadeState}>No subcategory data found</div>;
			}

			if (Array.isArray(subCategoryData)) {
				// Final items array
				return (
					<div className={`${fadeState} sub-text-container`}>
						{subCategoryData.map((text, index) => (
							<div
								ref={textRef}
								onMouseLeave={handleGifHoverLeaveOnText}
								key={text}
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
			} else {
				// If there are deeper levels (unlikely)
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

		return <div className={fadeState}>Invalid navigation state</div>;
	};

	return renderContent();
}

export default KurokoBasketBallText;
