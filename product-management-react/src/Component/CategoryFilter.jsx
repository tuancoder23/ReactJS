function CategoryFilter({ selectedCategory, onCategoryChange }) {
    return (
        <div>
            <label htmlFor="category-filter">
                Filter by Category
            </label>

            <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="">All Categories</option>
                <option value="Programming">Programming</option>
                <option value="Self-help">Self-help</option>
                <option value="Other">Other</option>
            </select>
        </div>
    );
}

export default CategoryFilter;