import {createRoot} from "react-dom/client";
import {Header} from "./header.jsx";
import {Main} from "./main.jsx"


function Page(){
    return(
        <>
        <Header/>
        <Main/>
        </>
    )
}

const root = createRoot(document.querySelector("#root"))
console.log(root);

root.render(
    <>
    <Page/>
    </>
)