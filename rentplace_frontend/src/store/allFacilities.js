import FacilityService from "../api/facilityService";


export async function getAllFacilities() {
    const facilities = await FacilityService.getAll();

    return facilities.map((facility) => ({
        id: facility.facilityId,
        name: facility.name,
        imageUrl: facility.imageDTO?.url || '',
    }));
}