import "./App.css";
import first_input from "../input.json";
import { useState } from "react";

function App() {
  const [div, setDiv] = useState(false);

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
        return true;
      }
    }
  }
  function finalFormater(
    array: { id: number; start: string; duration: number }[]
  ) {
    const arrayWithOverlap: any[] = [];

    ArrayFormater(array).map((list, index, input) => {
      const precedent = input[index - 1] != undefined ? input[index - 1] : 0;
      const overlap = overlapping(precedent, list);
      if (overlap == true) {
        precedent["overlap"] = true;
        list["overlap"] = true;
        const found = arrayWithOverlap.some(
          (el) => el.id == list.id || el.id == precedent.id
        );
        if (found == false) {
          arrayWithOverlap.push(precedent);
          arrayWithOverlap.push(list);
        }
      } else {
        list["overlap"] = false;
        const found = arrayWithOverlap.some(
          (el) => el.id == list.id || el.id == precedent.id
        );
        if (found == false) {
          arrayWithOverlap.push(precedent);
          arrayWithOverlap.push(list);
        }
      }
    });
    console.log(arrayWithOverlap.length);

    return arrayWithOverlap;
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
      {finalFormater(first_input).map((list, index, input) => {
        if (list.overlap == true) {
          return (
            <div
              style={{
                backgroundColor: "aqua",
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
          );
        } else {
          return (
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
          );
        }
        // {
        //   list.overlap == true ? (
        //     <div
        //       style={{
        //         backgroundColor: "red",
        //         border: "1px solid",
        //         position: "absolute",
        //         top: list.startPx,
        //         height: list.height,
        //         width: "50px",
        //       }}
        //       key={list.id}
        //     >
        //       {list.id}
        //     </div>
        //   ) : (
        //     <div
        //       style={{
        //         backgroundColor: "red",
        //         border: "1px solid",
        //         position: "absolute",
        //         top: list.startPx,
        //         height: list.height,
        //         width: "50px",
        //       }}
        //       key={list.id}
        //     >
        //       {list.id}
        //     </div>
        //   );
        // }
      })}
    </div>
  );
}

export default App;
