import { useState } from "react";

function useMousePosition(ref) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const handleGifMouseMove = (e) => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect();
			// Calculate mouse position relative to element center (0,0 at center)
			const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // Range -1 to 1
			const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // Range -1 to 1
			setMousePosition({ x, y });
		}
	};

	return { mousePosition, handleGifMouseMove };
}


export default useMousePosition;