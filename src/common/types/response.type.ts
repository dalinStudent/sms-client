export type Response<T> = {
    data: T;
    status: {
        code: number;
        errorCode: string;
        message: string;
        timestamp: string;
    }
}