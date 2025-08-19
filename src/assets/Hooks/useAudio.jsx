// hooks/useAudio.js
import { useState, useEffect, useRef } from "react";

export function useAudio() {
    const [volume, setVolume] = useState(1.0);
    const [isMuted, setIsMuted] = useState(false);
    const [musicIndex, setMusicIndex] = useState(null); // Track the current music index
    const audioRef = useRef(null);

    // Audio files in public/audio folder
    const audioFiles = [
        "/Music/DragonBallMusic1.mp3",
        "/Music/BleachMusic2.mp3",
        "/Music/BlackCloverMusic1.mp3",
        "/Music/FateMusic1.mp3",
        "/Music/KurokoMusic1.mp3",
        "/Music/SwordArtOnlineMusic1.mp3",
        "/Music/SoloLevelingMusic.mp3", // Solo Leveling music is index 6
    ];

    // Initialize audio
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.volume = isMuted ? 0 : volume;

        // Cleanup function
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
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    // Handle when music index changes
    useEffect(() => {
        if (musicIndex !== null && audioRef.current) {
            playAudioByIndex(musicIndex);
        }
    }, [musicIndex]);

    const playAudioByIndex = (index) => {
        if (audioRef.current && audioFiles[index]) {
            // Only change source if it's a different track
            if (audioRef.current.src !== audioFiles[index]) {
                audioRef.current.src = audioFiles[index];
                audioRef.current.currentTime = 0;
                audioRef.current.loop = true; // Enable looping
            }
            
            // Play the audio if it's not already playing
            if (audioRef.current.paused) {
                audioRef.current
                    .play()
                    .catch((e) => console.log("Audio play failed:", e));
            }
        }
    };

    return {
        volume,
        setVolume,
        isMuted,
        setIsMuted,
        playAudioByIndex,
        musicIndex,
        setMusicIndex
    };
}