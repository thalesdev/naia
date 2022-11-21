import type { NextApiRequest, NextApiResponse } from 'next'
import { amadeus } from '../../config/amadeus'
import NextCors from 'nextjs-cors';


function makeFakeDoc(length: Number) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

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

    if (req.method === 'POST') {
        if (typeof req?.body === "undefined") {
            return res.status(400).json({
                error: "Missing body"
            })
        }
        const offers = req.body?.offers || []
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
            // Create random booking reference
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
                                "emailAddress": `jhon.doe_${makeFakeDoc(2)}@test.com`,
                                "phones": [{
                                    "deviceType": "MOBILE",
                                    "countryCallingCode": "34",
                                    "number": makeFakeDoc(9)
                                }]
                            },
                            "documents": [{
                                "documentType": "PASSPORT",
                                "birthPlace": "Madrid",
                                "issuanceLocation": "Madrid",
                                "issuanceDate": "2015-04-14",
                                "number": makeFakeDoc(8),
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
            res.status(500).json({ error: "Internal Server Error" })
        }
    }
    res.status(404)
}