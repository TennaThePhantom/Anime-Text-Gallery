import React, { useRef, useState } from "react";
import useMousePosition from "../hooks/useMousePosition.jsx";
import HoverGifs from "./HoverGifs.jsx";
import { SwordArtOnlineTextData } from "../data/textData.js";

function SwordArtOnlineText({ currentText, navigate, fadeState }) {
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
					{Object.keys(SwordArtOnlineTextData).map((category, index) => (
						<div
							ref={textRef}
							key={category}
							onMouseLeave={handleGifHoverLeaveOnText}
						>
							<p
								className="sub-text"
								onMouseEnter={() => HandleGifHoverOnText(index)}
								onMouseMove={handleGifMouseMove}
								onClick={() => {
									if (category === "Kirito Friends") {
										navigate({ type: "saoFriends", category, level: 1 });
									}
								}}
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

		if (currentText.type === "saoFriends" && currentText.level === 1) {
			const categoryData = SwordArtOnlineTextData[currentText.category];

			if (!categoryData) {
				return <div className={fadeState}>No data found</div>;
			}

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
	};
	return renderContent();
}

export default SwordArtOnlineText;
