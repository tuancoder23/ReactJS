function SortButton({ isSorted, onToggleSort }) {
    return (
        <button onClick={onToggleSort}>
            {isSorted ? "Tắt sắp xếp A-Z" : "Sắp xếp A-Z"}
        </button>
    );
}

export default SortButton;