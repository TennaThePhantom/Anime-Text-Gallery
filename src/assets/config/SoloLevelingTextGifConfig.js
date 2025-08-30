import soloLevelingGif2 from "../Images/Solo-Leveling/solo2.gif";
import soloLevelingGif3 from "../Images/Solo-Leveling/solo3.gif";
import sungJinWooGif1 from "../Images/Solo-Leveling/sung-jin-woo1.webp";
import sungJinWooGif2 from "../Images/Solo-Leveling/sung-jin-woo2.gif";
import sungJinWooGif3 from "../Images/Solo-Leveling/sung-jin-woo-3.gif";

export const soloLevelingTextGif = {
	"Sung Jin-Woo": {
		gifs: [
			{
				src: sungJinWooGif1,
				className: "gif-top",
				basePosition: {
					top: -160,
					left: -100,
					followStrength: 15,
				},
			},
			{
				src: soloLevelingGif2,
				className: "gif-left",
				basePosition: {
					top: -50,
					left: -390,
					followStrength: 15,
				},
			},
			{
				src: soloLevelingGif3,
				className: "gif-right",
				basePosition: {
					top: -50,
					left: 30,
					followStrength: 15,
				},
			},

			{
				src: sungJinWooGif2,
				className: "gif-right",
				basePosition: {
					top: 50,
					left: -1,
					followStrength: 15,
				},
			},

			{
				src: sungJinWooGif3,
				className: "gif-left",
				basePosition: {
					top: 50,
					left: -270,
					followStrength: 15,
				},
			},
		],
	},
};
