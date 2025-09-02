import React, { useRef, useState } from "react";
import useMousePosition from "../hooks/useMousePosition.jsx";
import HoverGifs from "./HoverGifs.jsx";
import { SoloLevelingTextData } from "../data/textData.js";

function SoloLevelingText({ currentText, fadeState }) {
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
	};
    return renderContent();
}

export default SoloLevelingText;
