export interface AirportInfo {
    iataCode: string;
    timezoneOffset: string;
    geoCode: {
        latitude: number;
        longitude: number;
    }
    detailedName: string;
    name: string;
    type: string;
    subType: string;
}
export interface NearestAirportResponse {
    data: AirportInfo[];
    meta?: {
        count: number
        links: {
            self: string
            next: string
            last: string
        }
    }
}