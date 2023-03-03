const checkForEnvironmentVariable = (variable: string | undefined | boolean, csv = false): any => {
    if (variable && variable === 'undefined') {
        return undefined
    }

    if (variable === 'null') {
        return null
    }

    if (csv) {
        try {
            return (variable as string).split(',').map((x) => x.trim())
        } catch (error) {
            console.error("error parsing environment variable '%s' as csv: %o", variable, error)
            return null
        }
    }

    return variable
}

interface API {
    BACKEND_URL: string
}

export interface Environment {
    API: API
}

export const environment: Environment = {
    API: {
        BACKEND_URL: process.env.CLIENT_BACKEND_URL || 'http://127.0.0.1:8000',
    },
}
