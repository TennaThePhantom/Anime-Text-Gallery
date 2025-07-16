import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mainScreenTextGif } from "../config/textGifConfig";
import "../CSS/HoverGifs.css";

function HoverGifs({ text, index, isActive, textContainerRef, mousePosition }) {
	const gifConfig = mainScreenTextGif[text] || mainScreenTextGif[index];

	const getGiftPosition = (basePos) => {
		if (!textContainerRef.current) return null;

		const textRect = textContainerRef.current.getBoundingClientRect();
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
	return (
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
	);
}

export default HoverGifs;
