import type { NextApiRequest, NextApiResponse } from 'next'
import { amadeus } from '../../config/amadeus'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'POST') {
        if (typeof req?.body === "undefined") {
            return res.status(400).json({
                error: "Missing body"
            })
        }
        const offers = JSON.parse(req.body)?.offers || []
        if (offers.length === 0) {
            return res.status(400).json({
                error: "Missing offers"
            })
        }
        try {

            const pricedOffer = await amadeus.shopping.flightOffers.pricing.post(
                JSON.stringify({
                    "data": {
                        "type": "flight-offers-pricing",
                        "flightOffers": [
                            ...offers
                        ]
                    }
                })
            )
            const results = await amadeus.booking.flightOrders.post(
                JSON.stringify({
                    'data': {
                        'type': 'flight-order',
                        'flightOffers': [pricedOffer.data.flightOffers[0]],
                        'travelers': [{
                            "id": "1",
                            "dateOfBirth": "1982-01-16",
                            "name": {
                                "firstName": "JHON",
                                "lastName": "DOE"
                            },
                            "gender": "MALE",
                            "contact": {
                                "emailAddress": "jhon.doe@test.com",
                                "phones": [{
                                    "deviceType": "MOBILE",
                                    "countryCallingCode": "34",
                                    "number": "480080076"
                                }]
                            },
                            "documents": [{
                                "documentType": "PASSPORT",
                                "birthPlace": "Madrid",
                                "issuanceLocation": "Madrid",
                                "issuanceDate": "2015-04-14",
                                "number": "00000000",
                                "expiryDate": "2025-04-14",
                                "issuanceCountry": "ES",
                                "validityCountry": "ES",
                                "nationality": "ES",
                                "holder": true
                            }]
                        }]
                    }
                })
            )

            res.status(200).json({ ...(results.result ?? {}) })
        } catch (err) {
            console.log("error2:", err)
            res.status(500).json({ error: "Internal Server Error" })
        }
    }
    res.status(404)
}