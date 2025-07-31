import dragonBallGif1 from "../Images/DragonBall/broly.gif";
import dragonBallGif2 from "../Images/DragonBall/gogeta.gif";
import dragonBallGif3 from "../Images/DragonBall/goku.gif";
import bleachGift1 from "../Images/Bleach/bleach1.webp";
import bleachGift2 from "../Images/Bleach/bleach2.webp";
import bleachGift3 from "../Images/Bleach/bleach3.gif";
import blackCloverGif1 from "../Images/BlackClover/blackCloverGif1.gif";
import blackCloverGif2 from "../Images/BlackClover/blackCloverGif2.webp";
import blackCloverGif3 from "../Images/BlackClover/blackCloverGif3.gif";
import fateGif1 from "../Images/FateSeries/fate1.gif";
import fateGif2 from "../Images/FateSeries/fate2.gif";
import fateGif3 from "../Images/FateSeries/fate3.gif";
import KurukoGif1 from "../Images/Kuruko's-Basketball/Kuruko1.gif";
import KurukoGif2 from "../Images/Kuruko's-Basketball/Kuruko2.gif";
import KurukoGif3 from "../Images/Kuruko's-Basketball/Kuruko3.gif";
import swordArtOnlineGif1 from "../Images/Sword-Art-Online/swordArtOnline1.gif";
import swordArtOnlineGif2 from "../Images/Sword-Art-Online/swordArtOnline2.gif";
import swordArtOnlineGif3 from "../Images/Sword-Art-Online/swordArtOnline3.gif";
import soloLevelingGif1 from "../Images/Solo-Leveling/solo1.gif";
import soloLevelingGif2 from "../Images/Solo-Leveling/solo2.gif";
import soloLevelingGif3 from "../Images/Solo-Leveling/solo3.gif";
import sungJinWooGif1 from "../Images/Solo-Leveling/sung-jin-woo1.webp"
import sungJinWooGif2 from "../Images/Solo-Leveling/sung-jin-woo2.gif"
import sungJinWooGif3 from "../Images/Solo-Leveling/sung-jin-woo-3.gif"


export const mainScreenTextGif = {
	"Dragon Ball": {
		gifs: [
			{
				src: dragonBallGif1,
				className: "gif-top",
				basePosition: {
					top: -140, // positive means below text bottom
					left: -100, // positive means right of text negative means left of text
					followStrength: 15,
				},
			},
			{
				src: dragonBallGif2,
				className: "gif-left",
				basePosition: {
					top: -10,
					left: -420,
					followStrength: 15,
				},
			},
			{
				src: dragonBallGif3,
				className: "gif-right",
				basePosition: {
					top: -1,
					left: 30, 
					followStrength: 15,
				},
			},
		],
	},

	"Bleach": {
		gifs: [
			{
				src: bleachGift1,
				className: "gif-top",
				basePosition: {
					top: -150,
					left: -100, 
					followStrength: 15,
				},
			},
			{
				src: bleachGift2,
				className: "gif-left",
				basePosition: {
					top: -10,
					left: -340,
					followStrength: 15,
				},
			},
			{
				src: bleachGift3,
				className: "gif-right",
				basePosition: {
					top: -1,
					left: 30,
					followStrength: 15,
				},
			},
		],
	},

	"Black Clover": {
		gifs: [
			{
				src: blackCloverGif1,
				className: "gif-top",
				basePosition: {
					top: -150,
					left: -100, 
					followStrength: 15,
				},
			},
			{
				src: blackCloverGif2,
				className: "gif-left",
				basePosition: {
					top: -10,
					left: -430,
					followStrength: 15,
				},
			},
			{
				src: blackCloverGif3,
				className: "gif-right",
				basePosition: {
					top: -1,
					left: 20,
					followStrength: 15,
				},
			},
		],
	},

	"Fate Series": {
		gifs: [
			{
				src: fateGif1,
				className: "gif-top",
				basePosition: {
					top: -150,
					left: -90, 
					followStrength: 15,
				},
			},
			{
				src: fateGif2,
				className: "gif-left",
				basePosition: {
					top: -10,
					left: -400,
					followStrength: 15,
				},
			},
			{
				src: fateGif3,
				className: "gif-right",
				basePosition: {
					top: -1,
					left: 10,
					followStrength: 15,
				},
			},
		],
	},
	"Kuruko's Basketball": {
		gifs: [
			{
				src: KurukoGif3,
				className: "gif-top",
				basePosition: {
					top: -155,
					left: -100, 
					followStrength: 15,
				},
			},
			{
				src: KurukoGif2,
				className: "gif-left",
				basePosition: {
					top: -10,
					left: -550,
					followStrength: 15,
				},
			},
			{
				src: KurukoGif1,
				className: "gif-right",
				basePosition: {
					top: -1,
					left: 10,
					followStrength: 15,
				},
			},
		],
	},
	"Sword Art Online": {
		gifs: [
			{
				src: swordArtOnlineGif2,
				className: "gif-top",
				basePosition: {
					top: -160,
					left: -100, 
					followStrength: 15,
				},
			},
			{
				src: swordArtOnlineGif1,
				className: "gif-left",
				basePosition: {
					top: -10,
					left: -500,
					followStrength: 15,
				},
			},
			{
				src: swordArtOnlineGif3,
				className: "gif-right",
				basePosition: {
					top: -1,
					left: 30,
					followStrength: 15,
				},
			},
		],
	},
	"Solo Leveling": {
		gifs: [
			{
				src: soloLevelingGif1,
				className: "gif-top",
				basePosition: {
					top: -140,
					left: -100, 
					followStrength: 15,
				},
			},
			{
				src: soloLevelingGif2,
				className: "gif-left",
				basePosition: {
					top: -10,
					left: -430,
					followStrength: 15,
				},
			},
			{
				src: soloLevelingGif3,
				className: "gif-right",
				basePosition: {
					top: -1,
					left: 0,
					followStrength: 15,
				},
			},
		],
	},
};


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

}