import type { NextApiRequest, NextApiResponse } from 'next'
import { amadeus } from '../../config/amadeus'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'GET') {
        if (typeof req?.query.lat === "undefined" || typeof req?.query.lng === "undefined") {
            return res.status(400).json({
                error: "Missing lat or lng."
            })
        }
        const { lat, lng } = req.query ?? { lat: 0, lng: 0 }

        const results = await amadeus.referenceData.locations.airports.get({
            longitude: Number(lng),
            latitude: Number(lat)
        })
        res.status(200).json({ ...(results.result ?? {}) })
    }
    res.status(404)
}