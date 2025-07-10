import "../CSS/MainScreenText.css";
import React, { useEffect } from "react";
function MainScreenText({ text, index }) {
	const textAnimationsClasses = [
		"dragon-ball-text-animated",
		"bleach-text-animated",
		"black-clover-animated-text",
		"fate-series-animated-text",
		"kuroko-basketball-animated-text",
		"sword-art-online-animated",
		"solo-leveling-animated"
	];

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
					spanText.style.color = "text-zinc-300";
				} else {
				spanText.classList.add('color-char');
				}

				kurokoAnimatedText.appendChild(spanText);
			});
		}
	}, []);

	const textAnimation =
		textAnimationsClasses[index % textAnimationsClasses.length];
	return (
		// This component displays text on the main screen.
		<div className={`main-screen-text ${textAnimation}`}>
			<p data-text={index === 5 ? "SWORD ART ONLINE " : undefined}>{text.toUpperCase()}</p>
		</div>
	);
}
export default MainScreenText;
