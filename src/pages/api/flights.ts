import type { NextApiRequest, NextApiResponse } from 'next'
import { amadeus } from '../../config/amadeus'
import NextCors from 'nextjs-cors';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    if (req.method === 'GET') {
        if (typeof req?.query.iataCode === "undefined") {
            return res.status(400).json({
                error: "Missing iataCode."
            })
        }
        const { iataCode, date } = req.query

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