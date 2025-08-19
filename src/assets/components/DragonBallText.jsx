import React, { useRef, useState } from "react";
import useMousePosition from "../Hooks/useMousePosition.jsx";
import HoverGifs from "./HoverGifs.jsx";
import { DragonBallTextData } from "../data/textData.js";

function DragonBallText({ currentText, navigate, fadeState }) {
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
		if (currentText.type === "dragonBallCategory" && currentText.level === 1) {
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
		} else {
			return (
				<div className={`${fadeState} sub-text-container`}>
					{Object.keys(categoryData).map((item, index) => (
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
	};
	return renderContent();
}

export default DragonBallText;
