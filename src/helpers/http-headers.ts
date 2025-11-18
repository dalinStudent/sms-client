export default (hashed: string) => {
    const headers = {
        'Accept-Language': 'en',
        Hash: hashed,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }

    return headers
}

export const authFileHeader = (hashed: string) => {
    const headers = {
        'Accept-Language': 'en',
        Hash: hashed,
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
    }

    return headers
}
