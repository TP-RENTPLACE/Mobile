import apiClient from "./apiClient";

export const generateDescriptionFromAI = async (formData) => {
    return await apiClient.post("/ai/description",  formData, {authRequired: true});
};