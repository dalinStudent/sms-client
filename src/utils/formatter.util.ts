export const formatEnumToText = (value: string) => {
    if (!value || value === '') {
        return ''
    }

    return value
        .toLowerCase()
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}