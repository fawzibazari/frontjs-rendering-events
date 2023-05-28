import "./App.css";
import input from "../input.json";

function App() {
function inputFormater(startime:string) {
  const parced = startime.replace(':','')
  return `${parced}px`
}
  return (
    <div style={{ height: "2400px", width: "100%" }}>
      {input.map(list => (
        <div
        style={{
          backgroundColor: "red",
          position: "relative",
          top: inputFormater(list.start),
        }}
        key={list.id}
      >
        {inputFormater(list.start)}
      </div> 
        ))}
    </div>
  );
}

export default App;
