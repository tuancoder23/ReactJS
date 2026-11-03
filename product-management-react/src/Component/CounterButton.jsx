export default CounterButton;
function CounterButton({ onPress, label }) {
    return (
        <button onClick={onPress}>{label}</button>
    );
}