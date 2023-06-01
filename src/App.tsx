import "./App.css";
import first_input from "../input.json";

function App() {
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
  function overlapping(elt1: any, elt2: any) {
    if (elt1 != 0) {
      if (elt1.end >= elt2.start) {
        console.log(elt1.id, elt2.id);

        return true;
      }
    }
  }

  // if inférieurer a end time du premier ils se chevauchent forcement
  return (
    <div
      style={{
        height: "2400px",
        width: "100%",
        position: "relative",
      }}
    >
      {[...Array(2401)].map((_x, i) => {
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
        const precedent = input[index - 1] != undefined ? input[index - 1] : 0;
        const overlap = overlapping(precedent, list);
        if (overlap == true) {
          return (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                position: "relative",
              }}
            >
              <div
                style={{
                  backgroundColor: "red",
                  border: "1px solid",
                  position: "absolute",
                  top: list.startPx,
                  height: list.height,
                  width: "50px",
                }}
                key={list.id}
              >
                {list.id}
              </div>
              <div
                style={{
                  backgroundColor: "red",
                  border: "1px solid",
                  position: "absolute",
                  top: precedent.startPx,
                  height: precedent.height,
                  width: "50px",
                  left: "90px"
                }}
                key={precedent.id}
              >
                {precedent.id}
              </div>
            </div>
          );
        } else {
          // return (
          //   <div
          //     style={{
          //       backgroundColor: "red",
          //       position: "absolute",
          //       border: "1px solid",
          //       width: "100%",
          //       top: list.startPx,
          //       height: list.height,
          //     }}
          //     key={list.id}
          //   >
          //     {list.id}
          //   </div>
          // );
        }
      })}
    </div>
  );
}

export default App;
