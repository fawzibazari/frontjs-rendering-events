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
  function addMinutes(date: Date, minutes: number) {
    date.setMinutes(date.getMinutes() + minutes);
  
    return date;
  }


  function endTime(start: string, duration: number) {
    const date1 = new Date(`01/01/1970 ${start}`);
    const newDate = addMinutes(date1, duration);
    const currentHour = newDate.getHours();
    const currentMinute = newDate.getMinutes();

    return `${currentHour}:${currentMinute}`
    

  }
  // if inférieurer a end time du premier ils se chevauchent forcement
  return (
    <div style={{ height: "2400px", width: "100%" }}>
      {input.map((list, index) => {
        const newObject = {
          id: list.id,
          duration: list.duration,
          start: list.start,
          startPx: list.start.replace(":", "").toString() + "px",
          height: (list.duration / 60) * 100,
          end: endTime(list.start, list.duration)
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
                top: newObject.startPx,
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
