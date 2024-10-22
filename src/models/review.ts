export type updateReviewDto = {
    reviewId: string;
    reviewText: string;
    userRating: number;
};

export type CreateReviewDto = {
    reviewRoomId: string;
    reviewText: string;
    userRating: number;
    userId: string;
};