import '../CSS/MainScreenText.css';
function MainScreenText({text, index}) {
    const textAnimationsClasses = [
        "dragon-ball-text-animated",
        "bleach-text-animated"
    ]

    const textAnimation = textAnimationsClasses[index % textAnimationsClasses.length]
	return (
        // This component displays text on the main screen.
        <div className={`main-screen-text ${textAnimation}`}>
            <p>{text.toUpperCase()}</p>
        </div>
	);
}
export default MainScreenText;