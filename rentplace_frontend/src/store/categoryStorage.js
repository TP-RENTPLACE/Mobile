export const saveSelectedCategories = (ids) => {
    localStorage.setItem("selectedCategoryIds", JSON.stringify(ids));
};

export const loadSelectedCategories = () => {
    const saved = localStorage.getItem("selectedCategoryIds");
    try {
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};