const errorMessage = (action: string, item: string) =>
    `Failed to ${action} ${item}. Please try again.`

const successMessage = (action: string, item: string) => `${item} ${action} successfully.`

export const messages = {
    success: {
        created: (item: string) => successMessage('created', item),
        updated: (item: string) => successMessage('updated', item),
        deleted: (item: string) => successMessage('deleted', item),
        submitted: (item: string) => successMessage('submitted', item),
        approved: (item: string) => successMessage('approved', item),
        rejected: (item: string) => successMessage('rejected', item),
        duplicated: (item: string) => successMessage('duplicate', item),
        deactivated: (item: string) => successMessage('deactivated', item),
        activated: (item: string) => successMessage('activated', item),
        cleared: (item: string) => successMessage('cleared', item),
        retried: (item: string) => successMessage('retried', item),
        changed: (item: string) => successMessage('changed', item),
        reset: (item: string) => successMessage('reset', item),
        resent: (item: string) => successMessage('resent', item)
    },
    error: {
        create: (item: string) => errorMessage('create', item),
        update: (item: string) => errorMessage('update', item),
        delete: (item: string) => errorMessage('delete', item),
        submit: (item: string) => errorMessage('submit', item),
        approve: (item: string) => errorMessage('approve', item),
        reject: (item: string) => errorMessage('reject', item),
        duplicate: (item: string) => errorMessage('duplicate', item),
        deactivate: (item: string) => errorMessage('deactivate', item),
        activate: (item: string) => errorMessage('activate', item),
        clear: (item: string) => errorMessage('clear', item),
        retry: (item: string) => errorMessage('retry', item),
        change: (item: string) => successMessage('change', item),
        reset: (item: string) => successMessage('reset', item),
        resend: (item: string) => errorMessage('resend', item),
        somethingIsWrong: () =>
            'Oops! Something went wrong. Please check your network connection or try again later.',
    },
    validation: {
        dateRange: (item: string) => `Date range exceeds ${item}. Please adjust the dates.`,
        image: (item: string) => `${item} is required.`,
        null: () => `Limit cannot be null or zero.`,
        decimal: () => `Please enter a non-decimal, non-negative number`,
        limit: () =>
            `Please ensure that single limits are lower than daily, and daily lower than monthly.`,
        award: () => `Award value must be between 1 and 1000.`,
        password: () => `Password doesn't meet requirements.`,
        passwordNotMatch: () => `Passwords don't match.`,
        emoji: () => `Emojis are not allowed.`,
        require: () => `Please fill in all required fields.`
    },
    info: {
        block: () =>
            `Your account has been temporarily locked for 1 hour due to multiple login attempts. Please try again later.`,
        reset: () => `We've sent a password reset link to your email. Please check your inbox.`,
        expire: () => `Your session has expired. Please log in again.`,
        incorrect: () => `Incorrect username or password. Please check and try again.`
    }
}
