import { Rating } from "./components/star-rating/star-rating.component";

export interface Trip {
    name: string,
    country: string,
    startDate: string,
    endDate: string,
    price: number,
    slots: number,
    description?: string,
    imageSource?: string,
    ratings: Rating
}