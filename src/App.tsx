import "./App.css";
import first_input from "../input.json";

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

    return `${currentHour < 10 ? "0" + currentHour : currentHour}:${
      currentMinute == 0 ? currentMinute + "0" : currentMinute
    }`;
  }

  function ArrayFormater(
    array: { id: number; start: string; duration: number }[]
  ) {
    const newArray = [];
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      const newObject = {
        id: element.id,
        duration: element.duration,
        start: element.start,
        startPx: element.start.replace(":", "").toString() + "px",
        height: (element.duration / 60) * 100,
        end: endTime(element.start, element.duration),
      };
      newArray.push(newObject);
    }

    for (let index = 0; index < newArray.length; index++) {
      let second_iterator = index + 1;
      while (second_iterator < newArray.length) {
        if (newArray[second_iterator].start < newArray[index].start) {
          const temp: any = newArray[index];
          newArray[index] = newArray[second_iterator];
          newArray[second_iterator] = temp;
        }
        second_iterator++;
      }
    }
    return newArray;
  }

  // if inférieurer a end time du premier ils se chevauchent forcement
  return (
    <div style={{ height: "2400px", width: "100%" }}>
      {[...Array(2401)].map((x, i) => {
        return (
          <p
            key={i}
            style={{
              zIndex: 2,
              position: "absolute",
              contentVisibility: `${
                i >= 1000
                  ? i.toString().slice(2).includes("00") == true
                    ? "initial"
                    : "hidden"
                  : i.toString().slice(1).includes("00") == true
                  ? "initial"
                  : "hidden"
              }`,
              top: `${
                i >= 1000
                  ? i.toString().slice(2).includes("00") == true
                    ? i
                    : "unset"
                  : i.toString().slice(1).includes("00") == true
                  ? i
                  : i
              }px`,
            }}
          >
            {`${i}px`}
          </p>
        );
      })}
      {ArrayFormater(first_input).map((list, index, input) => {
        if (
          (input[index - 1] == undefined ? "" : input[index - 1].end) >=
          list.start
        ) {
          console.log(input[index - 1].end, list.start);
          // console.log(input[index - 1].end >= list.start);
          // console.log(input[index - 1].id, list.id);
          return (
            <div
              style={{
                backgroundColor: "red",
                position: "absolute",
                border: "1px solid",
                width: "100%",
                top: list.startPx,
                height: list.height,
              }}
              key={list.id}
            >
              {list.id}
            </div>
          );
        } else {
          return (
            <div
              style={{
                backgroundColor: "red",
                position: "absolute",
                border: "1px solid",
                width: "100%",
                top: list.startPx,
                height: list.height,
              }}
              key={list.id}
            >
              {list.id}
            </div>
          );
        }
      })}
    </div>
  );
}

export default App;
