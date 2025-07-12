import dragonBallGif1 from "../public/DragonBall/broly.gif";
import dragonBallGif2 from "../public/DragonBall/gogeta.gif";
import dragonBallGif3 from "../public/DragonBall/goku.gif";

export const mainScreenTextGif = {
	"Dragon Ball": {
		gifs: [
			{
				src: dragonBallGif1,
				className: "Gif-top",
				basePosition: {
					top: -230,
					left: -100, // relative to text center
					followStrength: 15,
				},
			},
			{
				src: dragonBallGif2,
				className: "Gif-top",
				basePosition: {
					top: -50,
					left: -260,
					followStrength: 15,
				},
			},
			{
				src: dragonBallGif3,
				className: "Gif-top",
				basePosition: {
					top: 40, // positive means below text bottom
					left: 30, // positive means right of text right
					followStrength: 15,
				},
			},
		],
	},
};
