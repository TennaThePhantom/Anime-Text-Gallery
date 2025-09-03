import "../css/MainScreenText.css";
import React, { useEffect, useState, useRef } from "react";
import HoverGifs from "../components/HoverGifs.jsx";
import useMousePosition from "../hooks/useMousePosition.jsx";
import { useAudio } from "../contexts/AudioContext.jsx";

function MainScreenText({ text, index, onClick, isActive }) {
	const { playTrack } = useAudio();

	const [isHovered, setIsHovered] = useState(false);
	const [showTextAnimation, setShowTextAnimation] = useState(false);
	const [hoverTimeOut, setIsHoverTimeOut] = useState(null);
	const textRef = useRef(null);
	const animationAppliedRef = useRef(false);

	const { mousePosition, handleGifMouseMove } = useMousePosition(textRef);

	const textAnimationsClasses = [
		"dragon-ball-text-animated-text",
		"bleach-text-animated-text",
		"black-clover-animated-text",
		"fate-series-animated-text",
		"kuroko-basketball-animated-text",
		"sword-art-online-animated-text",
		"solo-leveling-animated-text",
	];

	// kuroko basketball text animation
	const applyKurokoTextAnimation = () => {
		if (index % textAnimationsClasses.length !== 4) return;

		const animatedTextElement = textRef.current?.querySelector("p");
		if (!animatedTextElement || animationAppliedRef.current) return;

		const originalText = animatedTextElement.textContent;
		animatedTextElement.innerHTML = "";

		originalText.split("").forEach((char, charIndex) => {
			const spanText = document.createElement("span");
			spanText.className = `char-${charIndex + 1}`;
			spanText.textContent = char;
			spanText.classList.add("color-char");
			animatedTextElement.appendChild(spanText);
		});

		animationAppliedRef.current = true;
	};

	useEffect(() => {
		return () => {
			if (hoverTimeOut) clearTimeout(hoverTimeOut);
		};
	}, [hoverTimeOut]);

	useEffect(() => {
		if (isHovered) {
			applyKurokoTextAnimation();
		} else {
			animationAppliedRef.current = false;
		}
	}, [isHovered]);

	const handleHoverOnText = () => {
		setIsHovered(true); // Activates the GIFS Immediately

		// css text animation delay
		if (hoverTimeOut) clearTimeout(hoverTimeOut);
		const addAnimationText = setTimeout(() => {
			setShowTextAnimation(true);
		}, 2000);

		setIsHoverTimeOut(addAnimationText);
	};

	const handleHoverLeave = () => {
		setIsHovered(false); // gifs goes away immediately
		setShowTextAnimation(false);
		if (hoverTimeOut) {
			clearTimeout(hoverTimeOut);
		}
	};

	const handleClick = (e) => {
		e.stopPropagation();
		playTrack(index);
		if (onClick) {
			onClick();
		}
	};

	const textAnimation =
		textAnimationsClasses[index % textAnimationsClasses.length];
	return (
		// displays the main screen text.
		<div
			ref={textRef}
			className={`main-screen-text ${
				isActive || showTextAnimation ? textAnimation : ""
			}`}
			onMouseEnter={handleHoverOnText}
			onMouseLeave={handleHoverLeave}
			onMouseMove={handleGifMouseMove}
			onClick={handleClick}
		>
			<p data-text={index === 5 ? "SWORD ART ONLINE " : undefined}>
				{text.toUpperCase()}
			</p>
			<HoverGifs
				text={text}
				index={index}
				isActive={isHovered || isActive}
				textContainerRef={textRef}
				mousePosition={mousePosition}
			/>
		</div>
	);
}
export default MainScreenText;
