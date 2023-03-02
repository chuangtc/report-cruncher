import {PageStructureLayoutComponent} from "../../components/pageLayout/pageStructureLayout.component";
import {ChatPageComponent} from "./chatPage.component";

export const ChatPage = () => {
    return (
        <PageStructureLayoutComponent title={"Chat"} children={<ChatPageComponent/>}/>
    )
}
