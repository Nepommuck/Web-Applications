import { Rating } from "./components/star-rating/star-rating.component";

export interface Trip {
    id: number,
    name: string,
    country: string,
    startDate: string,
    endDate: string,
    price: number,
    slots: number,
    description?: string,
    imageSources: string[],
    ratings: Rating,
    reviews: TripReview[]
}

export interface TripReview {
    author: string,
    rating: number,
    comment: string,
    date?: string
}