import React, { useRef, useState } from "react";
import useMousePosition from "../Hooks/useMousePosition.jsx";
import HoverGifs from "./HoverGifs.jsx";
import { blackCloverTextData } from "../data/textData.js";

function BlackCloverText({ currentText, navigate, fadeState }) {
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
					{Object.keys(blackCloverTextData).map((category, index) => (
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
									navigate({ type: "blackCloverCategory", category, level: 1 })
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

		if (currentText.type === "blackCloverCategory" && currentText.level === 1) {
			const categoryData = blackCloverTextData[currentText.category];

			if (!categoryData) {
				return <div className={fadeState}>No data found</div>;
			}

			if (Array.isArray(categoryData)) {
				// Handle simple arrays (Dark Triad, Eye of the Midnight Sun, Asta Comrades)
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
			} else {
				// Handle nested objects (Black Bulls, Squad Captains, Wizard Kings)
				return (
					<div className={`${fadeState} sub-text-container`}>
						{Object.keys(categoryData).map((text, index) => {
							// Handle non-clickable items (Secre, Liebe, Julius)
							if (
								currentText.category === "Wizard Kings" &&
								text === "Julius Novachrono"
							) {
								return (
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
								);
							}

							// Default clickable behavior for other items
							return (
								<div
									ref={textRef}
									key={text}
									onMouseLeave={handleGifHoverLeaveOnText}
								>
									<p
										className="sub-text"
										onMouseEnter={() => HandleGifHoverOnText(index)}
										onMouseMove={handleGifMouseMove}
										onClick={() => {
											const value = categoryData[text];
											if (Array.isArray(value) || typeof value === "object") {
												navigate({
													type: "blackCloverSubCategory",
													category: currentText.category,
													subCategory: text,
													level: 2,
												});
											}
										}}
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
							);
						})}
					</div>
				);
			}
		}

		if (
			currentText.type === "blackCloverSubCategory" &&
			currentText.level === 2
		) {
			const subCategoryData =
				blackCloverTextData[currentText.category]?.[currentText.subCategory];

			if (!subCategoryData) {
				return <div className={fadeState}>No subcategory data found</div>;
			}

			if (Array.isArray(subCategoryData)) {
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
			} else {
				return (
					<div className={`${fadeState} sub-text-container`}>
						{Object.keys(subCategoryData).map((group, index) => {
							if (
								currentText.subCategory === "Black Bulls Members" &&
								["Secre", "Liebe"].includes(group)
							) {
								return (
									<div
										ref={textRef}
										key={group}
										onMouseLeave={handleGifHoverLeaveOnText}
									>
										<p
											className="sub-text"
											onMouseEnter={() => HandleGifHoverOnText(index)}
											onMouseMove={handleGifMouseMove}
										>
											{group}
											<HoverGifs
												text={group}
												index={index}
												isActive={isHovered === index}
												textContainerRef={textRef}
												mousePosition={mousePosition}
											/>
										</p>
									</div>
								);
							}
							return (
								<div
									ref={textRef}
									key={group}
									onMouseLeave={handleGifHoverLeaveOnText}
								>
									<p
										className="sub-text"
										onMouseEnter={() => HandleGifHoverOnText(index)}
										onMouseMove={handleGifMouseMove}
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
										<HoverGifs
											text={group}
											index={index}
											isActive={isHovered === index}
											textContainerRef={textRef}
											mousePosition={mousePosition}
										/>
									</p>
								</div>
							);
						})}
					</div>
				);
			}
		}

		if (currentText.type === "blackCloverGroup" && currentText.level === 3) {
			const groupData =
				blackCloverTextData[currentText.category]?.[currentText.subCategory]?.[
					currentText.group
				];

			if (!groupData) {
				return <div className={fadeState}>No group data found</div>;
			}

			return (
				<div className={`${fadeState} sub-text-container`}>
					{groupData.map((text, index) => (
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
		} else {
			return (
				<div className={`${fadeState} sub-text-container`}>
					{Object.keys(groupData).map((text, index) => (
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
	};
	return renderContent();
}

export default BlackCloverText;
