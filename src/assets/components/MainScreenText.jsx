import '../CSS/MainScreenText.css';
function MainScreenText({text}) {
	return (
        // This component displays text on the main screen.
        <div className="main-screen-text">
            <p>{text.toUpperCase()}</p>
        </div>
	);
}
export default MainScreenText;