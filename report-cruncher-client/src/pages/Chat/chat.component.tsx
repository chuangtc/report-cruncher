import {PageStructureLayoutComponent} from "../../components/pageLayout/pageStructureLayout.component";
import {ChatAreaComponent} from "./chatArea.component";

export const ChatPage = () => {
    return (
        <PageStructureLayoutComponent header={<h1>Chat</h1>} title={"Chat"} children={<ChatAreaComponent/>}/>
    )
}
