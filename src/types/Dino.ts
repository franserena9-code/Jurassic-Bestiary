export interface Dino {
    id: string
    name: string
    period: string
    region: string
    category: string
    diet: string
    image: string
    description: string
    size: string
    createdAt: string
    updatedAt: string
}

export interface DinoResponse {
    data: Dino[]
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}