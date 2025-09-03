import { useEffect } from "react";
import { mainScreenTextGif } from "../config/MainScreenTextGifConfig.js";
import { DragonBallTextGif } from "../config/DragonBallTextGifConfig.js";
import { BleachTextGif } from "../config/BleachTextGifConfig.js";
import { BlackCloverTextGif } from "../config/BlackCloverTextGifConfig.js";
import { SwordArtOnlineTextGif } from "../config/SwordArtOnlineTextGifConfig.js";
import { FateSeriesTextGif } from "../config/FateSeriesTextGifConfig.js";
import { KurokoBasketballTextGif } from "../config/KurokoBasketballTextGifConfig.js";
import { soloLevelingTextGif } from "../config/SoloLevelingTextGifConfig.js";

const usePreloadImages = () => {
	useEffect(() => {
		const allConfigs = [
			mainScreenTextGif,
			DragonBallTextGif,
			BleachTextGif,
			BlackCloverTextGif,
			SwordArtOnlineTextGif,
			FateSeriesTextGif,
			KurokoBasketballTextGif,
			soloLevelingTextGif,
		];

		// create a set to store images sources(avoids duplicates)
		const uniqueImageSources = new Set();

		// Loop each config and extract all image src values
		allConfigs.forEach((config) => {
			Object.values(config).forEach((anime) => {
				if (anime.gifs) {
					anime.gifs.forEach((gif) => {
						// Add the image src to the Set (duplicates are ignored)
						uniqueImageSources.add(gif.src);
					});
				}
			});
		});

		const preloadPromises = Array.from(uniqueImageSources).map((src) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.onload = resolve;
				img.onerror = resolve; // Resolve even on error to avoid blocking
				img.src = src;
			});
		});

		Promise.all(preloadPromises).then(() => {
			console.log("All images preloaded");
			// You could set a global state here if you want a preloader
		});
	}, []);
};

export default usePreloadImages;
