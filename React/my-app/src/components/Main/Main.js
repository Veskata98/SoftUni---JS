import { SelectionMenu } from "../SelectionMenu/SelectionMenu";
import "./Main.Module.css";

export const Main = () => {
  return (
    <main className="main">
      <div className="selection-menu">
        <SelectionMenu />
        <img
          className="selection-img"
          src={
            "https://cdn.wccftech.com/wp-content/uploads/2022/03/Intel-Arc-Alchemist-GPUs-740x740.jpg"
          }
          alt="item-img"
        />
      </div>
    </main>
  );
};
