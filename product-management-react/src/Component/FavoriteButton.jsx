
export default FavoriteButton;
function FavoriteButton({ favorite, onToggle }) {
    return (
        <button onClick={onToggle}>
            {favorite ? "Đã thích" : "Thích"}
        </button>
    );
}