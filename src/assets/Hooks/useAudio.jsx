// hooks/useAudio.js
import { useState, useEffect, useRef } from "react";

export function useAudio() {
	const [volume, setVolume] = useState(100);
	const [isMuted, setIsMuted] = useState(false);
	const audioRef = useRef(null);

	// Audio files in public/audio folder
	const audioFiles = [
		"/Music/DragonBallMusic1.mp3",
		"/Music/BleachMusic2.mp3",
		"/Music/BlackCloverMusic1.mp3",
		"/Music/FateMusic1.mp3",
		"/Music/KurokoMusic1.mp3",
		"/Music/SwordArtOnlineMusic1.mp3",
		"/Music/SoloLevelingMusic.mp3",
	];

	// Initialize audio
	useEffect(() => {
		audioRef.current = new Audio();
		audioRef.current.volume = isMuted ? 0 : volume / 100;

		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}
		};
	}, []);

	// Update volume when it changes
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = isMuted ? 0 : volume / 100;
		}
	}, [volume, isMuted]);

	const playAudioByIndex = (index) => {
		if (audioRef.current && audioFiles[index]) {
			// Use the public path directly
			audioRef.current.src = audioFiles[index];
			audioRef.current.currentTime = 0;
			audioRef.current
				.play()
				.catch((e) => console.log("Audio play failed:", e));
		}
	};

	return {
		volume,
		setVolume,
		isMuted,
		setIsMuted,
		playAudioByIndex,
	};
}
