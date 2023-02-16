let url =
  "http://cohort-calendars.us-west-2.elasticbeanstalk.com/calendar/NYOI/03";
let cache = { "Feb 15 2023": { "Event Title": 'Welcome Breakfast', "Room": 'Runway', "Start Time": '2023-02-15T23:29:00-05:00' } };
async function getData(url) {
  let data = await fetch(url).then((data) => data.json());

  for (let day in data) {
    cache[day] = [];

    data[day].forEach((event) => {
      cache[day].push({
        "Event Title": event.summary,
        "Room": event.location,
        "Start Time": new Date(event.start.dateTime).getTime(),
      });
    });
  }

  console.log(cache);

  const checkCurrentTime = () => {
    for (const day in cache) {
      cache[day].forEach((calEvent, i) => {
        let timeDiffMinutes = Math.floor((calEvent["Start Time"] - new Date().getTime()) / 1000 / 60)
        if (timeDiffMinutes <= 0) cache[day].splice(i, 1);
        if (timeDiffMinutes < 5) window.alert(`${calEvent["Event Title"]} in ${calEvent["Room"]} in 5 minutes!`);
        //double check that code continues executing when pop up appears 
        //not confirmed yet :)
      })
    }
  }

  setInterval(checkCurrentTime, 50000);

}
let data = getData(url);
