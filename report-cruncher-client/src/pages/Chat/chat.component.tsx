import {PageStructureLayoutComponent} from "../../components/pageLayout/pageStructureLayout.component";
import {ChatAreaComponent} from "./chatArea.component";

export const ChatPage = () => {
    return (
        <PageStructureLayoutComponent title={"Chat"} children={<ChatAreaComponent/>}/>
    )
}
