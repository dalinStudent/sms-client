export interface Role {
    id: number
    name: string
    title: string
    isSuperAdmin: boolean | null
}

export type RoleRequestPayload = Omit<Role, 'id'>