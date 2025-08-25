import { ImVolumeHigh } from "react-icons/im";
import { ImVolumeMedium } from "react-icons/im";
import { ImVolumeLow } from "react-icons/im";
import { ImVolumeMute } from "react-icons/im"; // volume is basically at 1-3 not muted
import { ImVolumeMute2 } from "react-icons/im";
import { useState, useEffect, useRef } from "react";
import { useAudio } from "../Contexts/AudioContext.jsx";

import "../CSS/Volume.css";
function Volume() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const { volume, setVolume, isMuted, setIsMuted } = useAudio();
	const [showVolumeSlider, setShowVolumeSlider] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const sliderTimeoutRef = useRef(null);
	const timeoutRef = useRef(null);
	const prevVolumeRef = useRef(volume);

	useEffect(() => {
		const checkUserDarkMode = () => {
			// checks the html document class for dark class
			setIsDarkMode(document.documentElement.classList.contains("dark"));
		};
		// checks if the user has dark mode enabled in their system on initial load once
		checkUserDarkMode();

		// watches for changes in the document's class attribute to detect dark mode changes
		const darkModeObserver = new MutationObserver(checkUserDarkMode);
		darkModeObserver.observe(document.documentElement, { attributes: true });

		return () => darkModeObserver.disconnect(); // cleanup observer on component(to make sure there's no memory leak)
	}, []);

	// handles the user clicking effect to close the volume slider
	useEffect(() => {
		const handleClickOutside = (event) => {
			// checks if the user clicked or hovered outside the volume slider/icon box
			if (
				sliderTimeoutRef.current &&
				!sliderTimeoutRef.current.contains(event.target)
			) {
				setShowVolumeSlider(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		// hides the volume slider after 3 seconds of inactivity on the slider
		if (isHovered) {
			clearTimeout(timeoutRef.current);
		} else if (showVolumeSlider && !isHovered) {
			timeoutRef.current = setTimeout(() => {
				setShowVolumeSlider(false);
			}, 3000);
		}
		return () => {
			// reset the timeout 
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [showVolumeSlider, isHovered]);

	const handleVolumeChange = (event) => {
		// updates the volume state and checks if the volume is muted
		const newVolume = parseInt(event.target.value);
		setVolume(newVolume / 100);
		setIsMuted(newVolume === 0);

		// reset the timeout when the user changes the volume in the slider
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	};

	const toggleVolumeSlider = (event) => {
		if (!event) {
			setShowVolumeSlider(true);
			return;
		}
		// Toggle slider visibility only if clicking the icon (not the slider)
		if (
			!sliderTimeoutRef.current
				.querySelector(".volume-slider-container")
				?.contains(event.target)
		) {
			setShowVolumeSlider(true);
		}
	};

	// handles the volume mute toggle
	const toggleVolumeMuted = () => {
		if (!isMuted) {
			prevVolumeRef.current = volume; // Store current volume before muting
			setIsMuted(true);
		} else {
			setIsMuted(false);
			setVolume(prevVolumeRef.current); // Restore pre-mute volume
		}
	};
	// toggles the volume icon and sets the volume to 0 if muted
	const displayVolumeIcon = () => {
		const volumePercent = volume * 100;
		if (isMuted || volumePercent === 0) {
			return (
				<ImVolumeMute2 className={`volume-icon ${isDarkMode ? "dark" : ""}`} />
			);
		} else if (volumePercent > 0 && volumePercent <= 5) {
			return (
				<ImVolumeMute className={`volume-icon ${isDarkMode ? "dark" : ""}`} />
			);
		} else if (volumePercent > 5 && volumePercent <= 30) {
			return (
				<ImVolumeLow className={`volume-icon ${isDarkMode ? "dark" : ""}`} />
			);
		} else if (volumePercent > 30 && volumePercent <= 70) {
			return (
				<ImVolumeMedium className={`volume-icon ${isDarkMode ? "dark" : ""}`} />
			);
		} else {
			return (
				<ImVolumeHigh className={`volume-icon ${isDarkMode ? "dark" : ""}`} />
			);
		}
	};
	return (
		<div ref={sliderTimeoutRef} className="volume-container">
			<button
				className={`volume ${isDarkMode ? "dark" : ""}`}
				onClick={toggleVolumeMuted}
				onMouseEnter={() => {
					toggleVolumeSlider();
					setIsHovered(true);
				}}
				onMouseLeave={() => setIsHovered(false)}
				aria-label={isMuted ? "Unmute Volume" : "Mute Volume"}
			>
				{displayVolumeIcon()}
			</button>

			{showVolumeSlider && (
				<div
					className="volume-slider-container "
					onMouseEnter={() => {
						setIsHovered(true);
						if (timeoutRef.current) {
							clearTimeout(timeoutRef.current);
						}
					}}
					onMouseLeave={() => setIsHovered(false)}
				>
					<div className="slider">
						<input
							type="range"
							min={0}
							max={100}
							value={isMuted ? 0 : volume * 100}
							onChange={handleVolumeChange}
							className="volume-slider"
							style={{
								background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
									isMuted ? 0 : volume * 100
								}%, #e5e7eb ${isMuted ? 0 : volume * 100}%, #e5e7eb 100%)`,
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default Volume;
