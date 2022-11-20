export interface FlightEndPoint {
    iataCode: string
    description: string
    terminal: string
    at: string
}

export interface FlightOffer {
    type: string
    id: string
    source: string
    instantTicketingRequired: boolean
    numberOfBookableSeats: number
    itineraries: {
        duration: string
        segments: {
            id: string
            numberOfStops: number
            departure: FlightEndPoint
            arrival: FlightEndPoint
            number: number
            duration: string
            stops: {
                iataCode: string
                duration: string
                arrivalAt: string
                departureAt: string
            }[]
        }[]
    }[]
    price: {
        total: number
        currency: string
        grandTotal: number
        fees: any[]
        taxes: any[]
    }
    additionalServices: any[]
}

export interface FlightSearch {
    meta: {
        count: number
        links: {
            self: string
        }
    }
    data: FlightOffer[]
}