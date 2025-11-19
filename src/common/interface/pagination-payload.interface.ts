export interface PaginatedRequestPayload {
    page: number
    size: number
    fromDate?: number | string
    toDate?: number | string
    searchBy?: string
}