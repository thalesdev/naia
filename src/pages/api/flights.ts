import type { NextApiRequest, NextApiResponse } from 'next'
import { amadeus } from '../../config/amadeus'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'GET') {
        if (typeof req?.query.iataCode === "undefined") {
            return res.status(400).json({
                error: "Missing iataCode."
            })
        }
        const { iataCode, date } = req.query

        console.log("datona", new Date().toISOString().split('T')[0])

        try {
            const results = await amadeus.shopping.flightOffersSearch.get({
                originLocationCode: 'GRU',
                destinationLocationCode: iataCode,
                departureDate: date ?? new Date().toISOString().split('T')[0],
                adults: '1'
            })
            res.status(200).json({ ...(results.result ?? {}) })
        } catch {
            return res.status(500).json({
                error: "Internal server error."
            })
        }

    }
    res.status(404)
}