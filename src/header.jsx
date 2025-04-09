import chefimg from "./chef.png";
import cooking from "./cooking.png";

export function Header(){
    return(
        <div className="header">
            <img className="chefimg" src={chefimg} alt="chef-img"></img>
            <p>Chef - AI <img src={cooking} className="cook"></img> Receipe Maker</p>
        </div>
    )
}