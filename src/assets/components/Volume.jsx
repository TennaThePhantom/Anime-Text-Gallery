import { ImVolumeHigh } from "react-icons/im";
import { ImVolumeMedium } from "react-icons/im";
import { ImVolumeLow } from "react-icons/im";
import { ImVolumeMute } from "react-icons/im"; // volume is basically at 1-3 not muted
import { ImVolumeMute2 } from "react-icons/im";
import { useState, useEffect, useRef } from "react";
import "../CSS/Volume.css";

function Volume() {
	const [volume, setVolume] = useState(0);
	const [isMuted, setIsMuted] = useState(false);
	const [showVolumeSlider, setShowVolumeSlider] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const sliderTimeoutRef = useRef(null);
	const timeoutRef = useRef(null);

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

	// handles the volume mute toggle
	const toggleVolumeMuted = (event) => {
		if (!isMuted) {
			setIsMuted(true);
		} else {
			setIsMuted(false);
			setVolume(volume === 0 ? 50 : volume); // sets the volume to 50 if it was muted
		}
		// Toggle slider visibility only if clicking the icon (not the slider)
		if (
			!sliderTimeoutRef.current
				.querySelector(".volume-slider-container")
				?.contains(event.target)
		) {
			setShowVolumeSlider(!showVolumeSlider);
		}
	};
	// toggles the volume icon and sets the volume to 0 if muted
	const displayVolumeIcon = () => {
		if (isMuted || volume === 0) {
			return <ImVolumeMute2 className="volume-icon" />;
		} else if (volume > 0 && volume <= 5) {
			return <ImVolumeMute className="volume-icon" />;
		} else if (volume > 5 && volume <= 30) {
			return <ImVolumeLow className="volume-icon" />;
		} else if (volume > 30 && volume <= 70) {
			return <ImVolumeMedium className="volume-icon" />;
		} else {
			return <ImVolumeHigh className="volume-icon" />;
		}
	};
	return (
		<div ref={sliderTimeoutRef}>
			<button
				className="volume-container"
				onClick={toggleVolumeMuted}
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
