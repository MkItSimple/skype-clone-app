// import moment from "moment";
// import "moment-precise-range-plugin";

// export const timeFormat = (time) => {
//   const before = time;
//   const today = moment();
//   const t = moment(before).preciseDiff(today);
//   const diff = t.split(" ").reverse();

//   const timeDisplay = !diff.includes("days")
//     ? moment(before).format("h:mm A")
//     : parseInt(diff[diff.indexOf("days") + 1]) > 7
//     ? moment(before).format("DD/MM/YYYY")
//     : moment(before).format("ddd");

//   return timeDisplay;
// };

// export const dayFormat = (time) => {
//   const before = time;
//   const today = moment();
//   const t = moment(before).preciseDiff(today);
//   const diff = t.split(" ").reverse();

//   const timeDisplay =
//     !diff.includes("days") && !diff.includes("day")
//       ? diff.includes("month") ||
//         diff.includes("months") ||
//         diff.includes("year")
//         ? moment(before).format("dddd, DD MMMM YYYY")
//         : "Today"
//       : parseInt(diff[diff.indexOf("days") + 1]) > 7
//       ? moment(before).format("dddd, DD MMMM YYYY")
//       : moment(before).format("dddd");

//   return timeDisplay;
// };

// export const minutesDifference = (messages, m, i) => {
//   if (i > 0) {
//     const p = moment(messages[i - 1].createdAt).format("YYYY-MM-DD HH:m:s");
//     const c = moment(m.createdAt).format("YYYY-MM-DD HH:m:s");
//     const t = moment(p).preciseDiff(c);

//     const diff = t.split(" ").reverse();

//     if (diff.includes("minutes")) return diff[diff.indexOf("minutes") + 1];
//     if (diff.includes("minute")) return diff[diff.indexOf("minute") + 1];
//   }

//   return 0;
// };
