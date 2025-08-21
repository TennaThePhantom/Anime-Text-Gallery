import "../CSS/MainScreenText.css";
import React, { useEffect, useState, useRef, use } from "react";
import HoverGifs from "../components/HoverGifs.jsx";
import useMousePosition from "../Hooks/useMousePosition.jsx";
import { useAudio } from "../Contexts/AudioContext.jsx";

function MainScreenText({ text, index, onClick, isActive }) {
	const { playTrack } = useAudio();

	const [isHovered, setIsHovered] = useState(false);
	const [showTextAnimation, setShowTextAnimation] = useState(false);
	const [hoverTimeOut, setIsHoverTimeOut] = useState(null);
	const textRef = useRef(null);
	const animationAppliedRef = useRef(false);

	const { mousePosition, handleGifMouseMove } = useMousePosition(textRef);

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

			if (charIndex === 6 || charIndex === 8) {
				spanText.style.color = "text-zinc-300";
			} else {
				spanText.classList.add("color-char");
			}
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

		// only for the css text animation (3-second delay might remove or reduce it)
		if (hoverTimeOut) clearTimeout(hoverTimeOut);
		const addAnimationText = setTimeout(() => {
			setShowTextAnimation(true);
		}, 3000);

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
		// This component displays text on the main screen.
		<div
			ref={textRef}
			className={`main-screen-text ${showTextAnimation ? textAnimation : ""}`}
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
				isActive={isHovered}
				textContainerRef={textRef}
				mousePosition={mousePosition}
			/>
		</div>
	);
}
export default MainScreenText;
