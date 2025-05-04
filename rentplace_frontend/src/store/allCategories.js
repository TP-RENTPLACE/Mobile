import CategoryService from "../api/categoryService";


export async function getAllCategories() {
    const categories = await CategoryService.getAll();

    return categories.map((category) => ({
        id: category.categoryId,
        name: category.name,
        imageUrl: category.imageDTO?.url || '',
    }));
}