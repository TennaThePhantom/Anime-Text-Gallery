import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mainScreenTextGif } from "../config/textGifConfig";
import "../CSS/HoverGifs.css";

function HoverGifs({ text, index, isActive }) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const textRef = useRef(null);

	const handleGifMouseMove = (e) => {
		if (textRef.current) {
			const rect = textRef.current.getBoundingClientRect();
			// Calculate mouse position relative to text center (0,0 at center)
			const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // Range -1 to 1
			const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // Range -1 to 1
			setMousePosition({ x, y });
		}
	};

	const getGiftPosition = (basePos) => {
		if (!textRef.current) return null;

		const textRect = textRef.current.getBoundingClientRect();
		const { x: mouseX, y: mouseY } = mousePosition;

		const { top, left, followStrength } = basePos;

		const absoluteTop =
			top >= 0
				? textRect.top + textRect.height + top + mouseY * followStrength
				: textRect.top + top + mouseY * followStrength;

		const absoluteLeft =
			left >= 0
				? textRect.left + textRect.width + left + mouseX * followStrength
				: textRect.left + textRect.width / 2 + left + mouseX * followStrength;

		return {
			position: "flex",
			top: absoluteTop,
			left: absoluteLeft,
			zIndex: 10, // place holder for now
			pointerEvents: "None",
		};
	};
	// currently it's working but it's connected to a new div element which I don't want
	const gifConfig = mainScreenTextGif[text] || mainScreenTextGif[index];
	return (
		<div
			ref={textRef}
			onMouseMove={handleGifMouseMove}
			style={{ display: "inline-block", position: "absolute", height: "300px"}} // change this to tailwind css later
		> hi
			<AnimatePresence>
				{isActive &&
					gifConfig?.gifs?.map((gif, gifIndex) => (
						<motion.img
							key={gifIndex}
							src={gif.src}
							alt={`gif ${gifIndex} `}
							className={`hover-gif ${gif.className}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							style={getGiftPosition(gif.basePosition)}
						/>
					))}
			</AnimatePresence>
		</div>
	);
}

export default HoverGifs;


