// componentMap.js
import KurokoBasketBallText from "../components/KurokoBasketballText.jsx";
import BleachText from "../components/BleachText.jsx";
import DragonBallText from "../components/DragonBallText.jsx";
import BlackCloverText from "../components/BlackCloverText.jsx";
import FateSeriesText from "../components/FateSeriesText.jsx";
import SwordArtOnlineText from "../components/SwordArtOnlineText.jsx";
import SoloLevelingText from "../components/SoloLevelingText.jsx";

// text mapping configuration
export const COMPONENT_MAP = {
	main: {
		"Solo Leveling": SoloLevelingText,
		"Kuroko's Basketball": KurokoBasketBallText,
		"Dragon Ball": DragonBallText,
		"Sword Art Online": SwordArtOnlineText,
		"Fate Series": FateSeriesText,
		"Bleach": BleachText,
		"Black Clover": BlackCloverText,
	},
	kurokoCategory: KurokoBasketBallText,
	kurokoSubCategory: KurokoBasketBallText,
	dragonBallCategory: DragonBallText,
	saoFriends: SwordArtOnlineText,
	FateCategory: FateSeriesText,
	FateSubCategory: FateSeriesText,
	bleachCategory: BleachText,
	bleachSubCategory: BleachText,
	thirdBleachCategory: BleachText,
	blackCloverCategory: BlackCloverText,
	blackCloverSubCategory: BlackCloverText,
	blackCloverGroup: BlackCloverText,
};

export const getTextComponent = (type, text = null) => {
	if (type === "main" && text) {
		return COMPONENT_MAP.main[text] || null;
	}
	return COMPONENT_MAP[type] || null;
};
