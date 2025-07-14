import dragonBallGif1 from "../Images/DragonBall/broly.gif";
import dragonBallGif2 from "../Images/DragonBall/gogeta.gif";
import dragonBallGif3 from "../Images/DragonBall/goku.gif";

export const mainScreenTextGif = {
	"Dragon Ball": {
		gifs: [
			{
				src: dragonBallGif1,
				className: "gif-top",
				basePosition: {
					top: -140,
					left: -100, // relative to text center
					followStrength: 15,
				},
			},
			{
				src: dragonBallGif2,
				className: "gif-left",
				basePosition: {
					top: -10,
					left: -400,
					followStrength: 15,
				},
			},
			{
				src: dragonBallGif3,
				className: "gif-right",
				basePosition: {
					top: -1, // positive means below text bottom
					left: 30, // positive means right of text right
					followStrength: 15,
				},
			},
		],
	},
};
