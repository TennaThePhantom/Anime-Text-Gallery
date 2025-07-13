import dragonBallGif1 from "../Images/DragonBall/broly.gif";
import dragonBallGif2 from "../Images/DragonBall/gogeta.gif";
import dragonBallGif3 from "../Images/DragonBall/goku.gif";

export const mainScreenTextGif = {
	"Dragon Ball": {
		gifs: [
			{
				src: dragonBallGif1,
				className: "Gif-top",
				basePosition: {
					top: -200,
					left: -100, // relative to text center
					followStrength: 15,
				},
			},
			{
				src: dragonBallGif2,
				className: "Gif-left",
				basePosition: {
					top: -90,
					left: -400,
					followStrength: 15,
				},
			},
			{
				src: dragonBallGif3,
				className: "Gif-right",
				basePosition: {
					top: -20, // positive means below text bottom
					left: 220, // positive means right of text right
					followStrength: 15,
				},
			},
		],
	},
};
