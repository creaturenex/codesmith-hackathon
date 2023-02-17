let url =
  "http://cohort-calendars.us-west-2.elasticbeanstalk.com/calendar/NYOI/03";

let cache = {
  Lava: [
    {
      "Event Title": "Event: Hug Fest",
      Room: "Room: In your Heart",
      "Start Time": new Date("Thu Feb 16 2023 18:55:47 GMT-0500").getTime(),
    },
  ],
};

async function getData(url) {
  let data = await fetch(url).then((data) => data.json());

  for (let day in data) {
    cache[day] = [];

    data[day].forEach((event) => {
      cache[day].push({
        "Event Title": event.summary,
        Room: event.location,
        "Start Time": new Date(event.start.dateTime).getTime(),
      });
    });
  }

  console.log(cache);
  const checkCurrentTime = () => {
    for (const day in cache) {
      cache[day].forEach((calEvent, i) => {
        // if(cache[Day] === )
        let timeDiffMinutes = Math.floor(
          (calEvent["Start Time"] - new Date().getTime()) / 1000 / 60
        );
        if (timeDiffMinutes < 0) cache[day].splice(i, 1);
        else if (timeDiffMinutes < 5)
          window.alert(
            `${calEvent["Event Title"]} in ${calEvent["Room"]} in 5 minutes!`
          );
        //double check that code continues executing when pop up appears
        //not confirmed yet :)
      });
    }
  };

  setInterval(checkCurrentTime, 1000);
}
getData(url);
// console.log(cache["Feb 16th 2023"])
