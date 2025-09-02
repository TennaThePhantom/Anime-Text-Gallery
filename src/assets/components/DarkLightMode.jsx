import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import "../CSS/DarkLightMode.css";
import { useState, useEffect } from "react";

function DarkLightMode() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	// user preference is first then user selects if he/she wants dark or light mode to be display
	useEffect(() => {
		if (typeof window !== "undefined") {
			const checkUserPreference = window.matchMedia(
				"(prefers-color-scheme: dark)"
			);
			setIsDarkMode(checkUserPreference.matches);
			if (checkUserPreference.matches) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}

			const windowAppearanceChange = (e) => {
				const prefersDark = e.matches;
				setIsDarkMode(prefersDark);
				if (prefersDark) {
					document.documentElement.classList.add("dark");
				} else {
					document.documentElement.classList.remove("dark");
				}
			};

			checkUserPreference.addEventListener("change", windowAppearanceChange);
			return () => {
				checkUserPreference.removeEventListener(
					"change",
					windowAppearanceChange
				);
			};
		}
	}, []);

	const toggleDarkMode = () => {
		const newMode = !isDarkMode;
		setIsDarkMode(newMode);

		if (newMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};

	return (
		<div className="darkLightMode" onClick={toggleDarkMode}>
			{isDarkMode ? (
				<MdLightMode className="DLM-icon" /> // shows light mode icon when dark mode is enabled
			) : (
				<MdDarkMode className="DLM-icon" /> // shows dark mode icon when light mode is enabled
			)}
		</div>
	);
}

export default DarkLightMode;
