import { Flex } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Header, Message, MessageCardsInfo, MessageProps, ReplyBox } from "../../components/chat"
import useLocalStorage from "../../hooks/useLocalStorage"

interface IMessage extends MessageProps {
    metaResponse?: IMessage
    storeIn?: string
}

async function getCards(dataset: Record<string, string>, callback: (iata: string) => void): Promise<MessageCardsInfo> {
    // todo: im future, use machine learning to get the best cards
    // for now, just get the first 3 selected for us
    // this would be used if inspiration api was catching 
    // try {
    //     const { lat, lng } = await new Promise<{ lat: Number, lng: Number }>((resolve, reject) => {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             let lat = position.coords.latitude;
    //             let lng = position.coords.longitude;
    //             resolve({ lat, lng })
    //         }, err => reject(err));
    //     })

    //     const aiports = (await fetch(`/api/airport?lat=${lat}&lng=${lng}`).then(res => {
    //         return res.json() as Promise<NearestAirportResponse>
    //     })).data.map(airport => airport.iataCode);

    // } catch {
    //     console.info("Could not get user location")
    // }
    // const places = getFlyArrayByInspiration(airports)
    // const filteredPlaces = filerPlacesByDataset(places, dataset) // IA operation, like KNN filter based


    return {
        cards: [
            {
                title: "Melbourne",
                image: "https://www.melbourne.vic.gov.au/SiteCollectionImages/budget-2022-23-400.jpg",
                subtitle: "Melbourne, Australia",
                rating: 4.6,
                onClick: () => callback("MEL")
            },
            {
                title: "Sydney",
                image: "https://www.viajenaviagem.com/wp-content/uploads/2016/02/sydney-intro-opera-1920x640-1.jpg",
                subtitle: "Sydney, Australia",
                rating: 4.5,
                onClick: () => callback("SYD")
            },
            {
                title: "Osaka",
                image: "https://res-4.cloudinary.com/jnto/image/upload/w_750,h_1100,c_fill,f_auto,fl_lossy,q_auto/v1516490612/osaka/Osaka829_1",
                subtitle: "Osaka, Japan",
                rating: 4.4,
                onClick: () => callback("OSA")
            }

        ]
    }
}

const dataset: Record<string, string> = {}


export const ChatView: React.FC = () => {

    const router = useRouter()
    const [cursor, setCursor] = useState(-1)
    const [replied, setReplied] = useState(false)
    const [_, setUserPreferences] = useLocalStorage("preferencies", dataset)
    const chatRef = useRef<any>(null)

    const [messages, setMessages] = useState<IMessage[]>([
        {
            time: new Date(),
            message: "Prazer! Meu nome é Naia, qual o seu nome?",
        }
    ])

    const naiaMessageQueue: IMessage[] = [
        {
            message: "Me conta, o que você curte?",
            metaResponse: {
                isOwn: true,
                replyOptions: {
                    0: "Sofisticação",
                    1: "Simplicidade",
                    2: "Selva",
                    3: "Luxo",
                    4: "Diversão",
                },
                onReply: (option) => {
                    dataset["likely"] = option
                    nextCursor()
                }

            }
        },
        {
            message: "Já tem planos para viajar?",
            metaResponse: {
                isOwn: true,
                replyOptions: {
                    0: "Sim",
                    1: "Não",
                },
                onReply: (option) => {
                    dataset["travel_plan"] = option
                    nextCursor()
                }
            }
        }, {
            message: "Quantos anos você tem?",
            storeIn: "age"
        }, {
            message: "Qual a sua profissão?",
            storeIn: "profession"
        },
        {
            message: "Olha só as melhores  recomendações de lugar que eu encontrei para você!",
            metaResponse: {
                cards: () => getCards(dataset, (place) => {
                    router.push(`/place-detail/${place}`)
                    setUserPreferences(dataset)
                })
            }
        }
    ]

    const nextCursor = () => setCursor(c => c + 1)
    const handleReply = useCallback((data: string) => {
        const lastMessage = messages[messages.length - 1]
        setReplied(true)
        nextCursor()
        setMessages(msg => [...msg, {
            isOwn: true,
            message: data,
            time: new Date()
        }])
        if (lastMessage.storeIn) {
            dataset[lastMessage.storeIn] = data
        }
    }, [messages])

    useEffect(() => {
        if (cursor >= 0) {
            const messageTop = naiaMessageQueue[cursor]
            if (messageTop) {
                const { metaResponse, ...message } = messageTop
                setMessages(msg => metaResponse ?
                    [...msg, message, metaResponse]
                    : [...msg, message])
                setReplied(false)
            }
        }
    }, [cursor])

    useLayoutEffect(() => {
        if (messages && messages.length > 0 && chatRef?.current) {
            chatRef?.current?.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [messages, chatRef])

    return (
        <>
            <Head>
                <title>Naila - Chat</title>
            </Head>
            <Flex flex={1} w="100vw" h="100vh" direction="column">
                <Header title="Naia" status="Em que posso ser útil?" />
                <Flex
                    flex={1}
                    w="100%"
                    h="calc(100% - 49px - 87px)"
                    direction="column"
                    overflowY={"auto"}
                    ref={chatRef}
                >
                    {messages.map((message, index) => (
                        <Message key={index} {...message} time={message.message && !message.time ? new Date() : message.time} />
                    ))}
                </Flex>
                <ReplyBox onReply={handleReply} />
            </Flex>
        </>
    )
}