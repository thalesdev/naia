import type { NextApiRequest, NextApiResponse } from 'next'
import { amadeus } from '../../config/amadeus'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'GET') {
        if (typeof req?.query.iataCodes === "undefined") {
            return res.status(400).json({
                error: "Missing iataCodes."
            })
        }
        const iataCodes = (req.query.iataCodes as string).split(",") ?? []


        const data = (await Promise.all(iataCodes.map(async (iataCode) => {
            try {
                const results = await amadeus.shopping.flightDestinations.get({
                    origin: iataCode
                })
                console.log(results?.result)
                return results?.result
            } catch (err) {
                return null
            }
        }))).filter((result) => result !== null)

        res.status(200).json({ travels: data })
    }
    res.status(404)
}