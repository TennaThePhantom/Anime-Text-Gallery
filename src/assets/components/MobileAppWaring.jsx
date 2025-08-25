import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWindowSize from "../Hooks/useWindowSize.jsx";

const MobileAppWaring = () => {
	const { width: screenWidth } = useWindowSize();
	const mobileWarning = "Mobile";
	useEffect(() => {
		const checkScreenSize = () => {
			if (screenWidth <= 768) {
				toast.warning(" Demo won't work as expected on smaller screen sizes", {
					position: "bottom-center",
					autoClose: 2000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					toastId: mobileWarning,
				});
			}
		};

		checkScreenSize();

		window.addEventListener("resize", checkScreenSize);

		return () => window.removeEventListener("resize", checkScreenSize);
	}, [screenWidth, mobileWarning]);

	return <ToastContainer />;
};

export default MobileAppWaring;
