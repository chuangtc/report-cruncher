import {PageStructureLayoutComponent} from "../../components/pageLayout/pageStructureLayout.component";
import {FileUploaderComponent} from "./fileUploader.component";
import {DragAndDropFileUploaderComponent} from "./dragAndDropFileUploader.component";

export const HomePage = () => {
    return (
        // <PageStructureLayoutComponent header={<h1>Home</h1>} title={"Home"} children={<FileUploaderComponent/>}/>
        <PageStructureLayoutComponent title={"Home"} children={<DragAndDropFileUploaderComponent/>}/>
    )
}
