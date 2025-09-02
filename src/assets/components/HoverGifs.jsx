import { motion, AnimatePresence } from "framer-motion";
import { mainScreenTextGif } from "../config/MainScreenTextGifConfig.js";
import { DragonBallTextGif } from "../config/DragonBallTextGifConfig.js";
import { BleachTextGif } from "../config/BleachTextGifConfig.js";
import { BlackCloverTextGif } from "../config/BlackCloverTextGifConfig.js";
import { SwordArtOnlineTextGif } from "../config/SwordArtOnlineTextGifConfig.js";
import { FateSeriesTextGif } from "../config/FateSeriesTextGifConfig.js";
import { KurokoBasketballTextGif } from "../config/KurokoBasketballTextGifConfig.js";
import { soloLevelingTextGif } from "../config/SoloLevelingTextGifConfig.js";
import "../css/HoverGifs.css";
import useWindowSize from "../hooks/useWindowSize.jsx";

function HoverGifs({ text, index, isActive, textContainerRef, mousePosition }) {
	const { width: screenWidth } = useWindowSize();
	const gifConfig =
		mainScreenTextGif[text] ||
		mainScreenTextGif[index] ||
		soloLevelingTextGif[text] ||
		FateSeriesTextGif[text] ||
		DragonBallTextGif[text] ||
		BleachTextGif[text] ||
		BlackCloverTextGif[text] ||
		SwordArtOnlineTextGif[text] ||
		KurokoBasketballTextGif[text];

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
				: textRect.left +
				  textRect.width / (screenWidth >= 1440 ? 2 : 1.65) +
				  left +
				  mouseX * followStrength;

		return {
			position: "absolute",
			top: absoluteTop,
			left: absoluteLeft,
			zIndex: 10,
			pointerEvents: "None",
		};
	};
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
