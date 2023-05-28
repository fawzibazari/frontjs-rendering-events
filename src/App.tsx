import "./App.css";
import input from "../input.json";

function App() {
  // function toHoursAndMinutes(totalMinutes: number) {
  //   const hours = Math.floor(totalMinutes / 60);
  //   const minutes = totalMinutes % 60;
  //   return `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}`;
  // }
  // function padToTwoDigits(num: number) {
  //   return num.toString().padStart(2, "0");
  // }

  // function endTime(start: string, duration: number) {

  // }
  // if inférieurer a end time du premier ils se chevauchent forcement
  return (
    <div style={{ height: "2400px", width: "100%" }}>
      {input.map((list, index) => {
        const newObject = {
          start: list.start.replace(":", "").toString() + "px",
          height: (list.duration / 60) * 100,
          // end
        };

        console.log(newObject);

        // console.log(index);
        // if (list.start < list.end[index -1]) {

        if (list.start) {
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
        } else {
          return <p key={list.id}>hello</p>;
        }
      })}
    </div>
  );
}

export default App;
