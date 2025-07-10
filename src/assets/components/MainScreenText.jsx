import "../CSS/MainScreenText.css";
import React, { useEffect, useState } from "react";
function MainScreenText({ text, index }) {
	const [isHoveredOnText, setIsHoveredOnText] = useState(false);
	const [hoverTimeOut, setIsHoverTimeOut] = useState(null);

	const textAnimationsClasses = [
		"dragon-ball-text-animated",
		"bleach-text-animated",
		"black-clover-animated-text",
		"fate-series-animated-text",
		"kuroko-basketball-animated-text",
		"sword-art-online-animated",
		"solo-leveling-animated",
	];

	// kuroko basketball text animation
	useEffect(() => {
		const kurokoAnimatedText = document.querySelector(
			".kuroko-basketball-animated-text"
		);
		if (kurokoAnimatedText) {
			const kurokoText = kurokoAnimatedText.textContent;
			kurokoAnimatedText.innerHTML = "";

			kurokoText.split("").forEach((char, charIndex) => {
				const spanText = document.createElement("span");
				spanText.className = `char-${charIndex + 1}`;
				spanText.textContent = char;

				if (charIndex === 6 || charIndex === 8) {
					// the ' and space
					spanText.style.color = "text-zinc-300";
				} else {
					spanText.classList.add("color-char");
				}

				kurokoAnimatedText.appendChild(spanText);
			});
		}
	}, []);

	const handleHoverOnText = () => {
		if (hoverTimeOut) clearTimeout(hoverTimeOut);

		const addAnimationText = setTimeout(() => {
			setIsHoveredOnText(true);
		}, 3000);

		setIsHoverTimeOut(addAnimationText);
	};

	const handleHoverLeave = () => {
		if (hoverTimeOut) {
			clearTimeout(hoverTimeOut);
		}
		setIsHoveredOnText(false);
	};

	const textAnimation =
		textAnimationsClasses[index % textAnimationsClasses.length];
	return (
		// This component displays text on the main screen.
		<div
			className={`main-screen-text ${isHoveredOnText ? textAnimation : ""}`}
			onMouseEnter={handleHoverOnText}
			onMouseLeave={handleHoverLeave}
		>
			<p data-text={index === 5 ? "SWORD ART ONLINE " : undefined}>
				{text.toUpperCase()}
			</p>
		</div>
	);
}
export default MainScreenText;
