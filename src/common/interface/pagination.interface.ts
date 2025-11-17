export interface ReportQuery {
    page?: number
    size?: number
    searchBy?: string
    timestamp: number
    activityType?: string
    trxType?: string
    memberLevel?: string
    endDate?: number
    startDate?: number
    adjustCategory? : string
    status? : string
}

export interface PaginatedQuery {
    page: number
    size?: number
    searchBy?: string
    timestamp?: number
}

export interface DateRangeQuery {
    fromDate?: number | string
    toDate?: number | string
    timestamp?: number
}
