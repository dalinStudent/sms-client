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

export const dateFormatter = (date: Date) => {
    date = new Date(date)

    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }

    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date)
    const formattedDateAMPM = formattedDate.replace(/am|pm/i, (match) => match.toUpperCase())
    return formattedDateAMPM
}