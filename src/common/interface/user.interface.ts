import type { PaginatedQuery } from "./pagination.interface"

export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    isActive: boolean
    role: string
    avatar: string
}

export interface UserPayload extends PaginatedQuery{
    
}

export interface MyProfile {
    id: number
    firstName: string
    lastName: string
    role: string
    email: string
}

export interface UserAuditLog {
    timestamp: number
    principal: string
    type: string
    data: {
        logging: string
    }
    clientIp: string
    userName: string
    userId: string
    userRole: string
    details: DetailInfo | null
}

export interface DetailInfo {
    id: number
    fieldName: string
    oldValue: string
    newValue: string
}
