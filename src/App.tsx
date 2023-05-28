import "./App.css";
import input from "../input.json";

function App() {

  return (
    <div style={{ height: "2400px", width: "100%" }}>
      {input.map((list) => {
        const newObject = {
          start: list.start.replace(":", "").toString() + "px",
          height: (list.duration / 60) * 100,
        };
        console.log(newObject);

        return (
          <div
            style={{
              backgroundColor: "red",
              position: "relative",
              border: "1px solid",
              top: newObject.start,
              height: newObject.height,
            }}
            key={list.id}
          >
            {list.id}
          </div>
        );
      })}
    </div>
  );
}

export default App;
