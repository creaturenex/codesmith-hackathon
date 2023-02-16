let todaysDate = new Date()

let url =
  "http://cohort-calendars.us-west-2.elasticbeanstalk.com/calendar/NYOI/03";
let query = ""

let cache = {};
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
}
let data = getData(url);
