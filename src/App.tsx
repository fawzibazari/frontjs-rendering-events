import "./App.css";
import input from "../input.json";

function App() {
function inputFormater(startime:string) {
  const parced = startime.replace(':','')
  return `${parced}px`
}
function durationToHeight(duration:number) {
  const hours = (duration / 60);
  console.log(hours * 100);

  return hours * 100
}
  return (
    <div style={{ height: "2400px", width: "100%" }}>
      {input.map(list => (
        <div
        style={{
          backgroundColor: "red",
          position: "relative",
          border: "1px solid",
          top: inputFormater(list.start),
          height: durationToHeight(list.duration)
        }}
        key={list.id}
      >
        {list.id}
      </div> 
        ))}
    </div>
  );
}

export default App;
