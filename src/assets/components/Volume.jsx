import { ImVolumeHigh } from "react-icons/im";
import { ImVolumeMedium } from "react-icons/im";
import { ImVolumeLow } from "react-icons/im";
import { ImVolumeMute } from "react-icons/im"; // volume is basically at 1-3 not muted
import { ImVolumeMute2 } from "react-icons/im";
import { useState, useEffect, useRef } from "react";
import "../CSS/Volume.css";

function Volume() {
	const [isDarkMode, setIsDarkMode] = useState(false); // state to manage dark mode
	const [volume, setVolume] = useState(100);
	const [isMuted, setIsMuted] = useState(false);
	const [showVolumeSlider, setShowVolumeSlider] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const sliderTimeoutRef = useRef(null);
	const timeoutRef = useRef(null);

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
		if (showVolumeSlider && !isHovered) {
			timeoutRef.current = setTimeout(() => {
				setShowVolumeSlider(false);
			}, 3000);
		}
		return () => {
			// reset the timeout when user hovers over the slider
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [showVolumeSlider, isHovered]);

	const handleVolumeChange = (event) => {
		// updates the volume state and checks if the volume is muted
		const newVolume = parseInt(event.target.value);
		setVolume(newVolume);
		setIsMuted(newVolume === 0);

		// reset the timeout when the user changes the volume in the slider
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	};

	const toggleVolumeSlider = (event) => {
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
			setIsMuted(true);
		} else {
			setIsMuted(false);
			setVolume(volume === 0 ? 50 : volume); // sets the volume to 50 if it was muted
		}
	};
	// toggles the volume icon and sets the volume to 0 if muted
	const displayVolumeIcon = () => {
		if (isMuted || volume === 0) {
			return (
				<ImVolumeMute2 className={`volume-icon ${isDarkMode ? "dark" : ""}`} />
			);
		} else if (volume > 0 && volume <= 5) {
			return (
				<ImVolumeMute className={`volume-icon ${isDarkMode ? "dark" : ""}`} />
			);
		} else if (volume > 5 && volume <= 30) {
			return (
				<ImVolumeLow className={`volume-icon ${isDarkMode ? "dark" : ""}`} />
			);
		} else if (volume > 30 && volume <= 70) {
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
		<div ref={sliderTimeoutRef}>
			<button
				className={`volume-container ${isDarkMode ? "dark" : ""}`}
				onClick={toggleVolumeMuted}
				onMouseEnter={() => {
					toggleVolumeSlider();
					setIsHovered(true);
				}}
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
							value={isMuted ? 0 : volume}
							onChange={handleVolumeChange}
							className="volume-slider"
							style={{
								background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
									isMuted ? 0 : volume
								}%, #e5e7eb ${isMuted ? 0 : volume}%, #e5e7eb 100%)`,
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default Volume;
