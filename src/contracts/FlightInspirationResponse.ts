export interface FlightInspiration {
    type: string;
    origin: string;
    destination: string;
    departureDate: string;
    returnDate: string;
    price: {
        total: Number;
    }
    links: {
        flightDates: string;
        flightOffers: string;
    };
}

export interface FlightInspirationResponse {
    data?: FlightInspiration[]
    meta?: {
        currency: string
        links: {
            self: string
        }
    }
    defaults: {
        departureDate: String,
        oneWay: boolean,
        duration: string,
        nonStop: boolean,
        viewBy: string
    }
}