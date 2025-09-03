import { createContext, useContext, useState, useEffect, useRef } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
	const [volume, setVolume] = useState(1.0);
	const [isMuted, setIsMuted] = useState(false);
	const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
	const audioRef = useRef(null);

	// Audio files in public/audio folder
	const audioFiles = [
		"/Music/DragonBallMusic.mp3",
		"/Music/BleachMusic.mp3",
		"/Music/BlackCloverMusic.mp3",
		"/Music/FateMusic.mp3",
		"/Music/KurokoMusic.mp3",
		"/Music/SwordArtOnlineMusic.mp3",
		"/Music/SoloLevelingMusic.mp3",
	];

	// Initialize audio
	useEffect(() => {
		audioRef.current = new Audio();
		return () => {
			audioRef.current?.pause();
		};
	}, []);

	// Handle volume changes
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = isMuted ? 0 : volume;
		}
	}, [volume, isMuted]);

	// Handle track changes
	useEffect(() => {
		if (currentTrackIndex !== null && audioRef.current) {
			audioRef.current.src = audioFiles[currentTrackIndex];
			audioRef.current.currentTime = 0;
			audioRef.current.loop = true;
			audioRef.current.play().catch((e) => console.log("Playback failed:", e));
		}
	}, [currentTrackIndex]);

	const playTrack = (index) => {
		setCurrentTrackIndex(index);
	};

	const stopTrack = () => {
		if (audioRef.current) {
			console.log("Stopping track:", audioRef.current.src);
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
			audioRef.current.src = ""; // This clears the audio source
		}
		setCurrentTrackIndex(null); // This updates the state
	};

	const value = {
		volume,
		setVolume,
		isMuted,
		setIsMuted,
		currentTrackIndex,
		playTrack,
		stopTrack,
		tracks: audioFiles,
	};

	return (
		<AudioContext.Provider value={value}>{children}</AudioContext.Provider>
	);
}

export function useAudio() {
	return useContext(AudioContext);
}
