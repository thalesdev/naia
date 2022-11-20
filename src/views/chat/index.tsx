import { Flex } from "@chakra-ui/react"
import Head from "next/head"
import { Header, Message, MessageCardsInfo, ReplyBox } from "../../components/chat"

export const ChatView: React.FC = () => {

    const cardSample: MessageCardsInfo = {
        cards: [{
            image: 'https://1.bp.blogspot.com/-zUW09eaRpRE/XlQKkl-59II/AAAAAAAACi8/FDUsw-L4oOoMuDFxxgWkaZNP91iA7vSwQCKgBGAsYHg/s1600/sunamganj.jpg',
            title: 'Niladri Reservoir',
            subtitle: 'Tekergat, Sunamgnj',
            subtitleIcon: null,
            rating: 4.7,
            onClick: () => { alert("You clicked on me!") }
        }, {
            image: 'https://cdn.nativeindonesia.com/foto/waduk-darma-kuningan/view-terkini-waduk-darma.jpg',
            title: 'Darma Reservoir',
            subtitle: 'Darma, Kuningan',
            rating: 4.9,
            subtitleIcon: null,
            onClick: () => { alert("You clicked on me!") }

        }],
        onMore: () => { }
    }


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
                >
                    <Message time={new Date()} message="Prazer! Meu nome é Naia, qual o seu nome?" />
                    <Message time={new Date()} message="Meu nome é *Luana Carolina*" isOwn />
                    <Message time={new Date()} message="Me conta, o que você curte?" />
                    <Message time={new Date()} isOwn replyOptions={{
                        "x-1": "Sofisticação",
                        "x-2": "Simplicidade",
                        "x-3": "Selva",
                        "x-4": "Luxo",
                        "x-5": "Diversão",
                    }} />
                    <Message time={new Date()} message="Já tem planos para viajar?" />
                    <Message time={new Date()} isOwn replyOptions={{
                        "x-1": "Sim",
                        "x-2": "Não",
                    }} />
                    <Message time={new Date()} message="Olha só as melhores  recomendações de viagem que eu encontrei para você!" />
                    <Message cards={cardSample} />

                </Flex>
                <ReplyBox />
            </Flex>
        </>
    )
}