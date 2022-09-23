import moment from "moment";
import "moment-precise-range-plugin";

export const insertEmojiHandler = (html) => {
  var sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      var el = document.createElement("div");
      el.innerHTML = html;
      var frag = document.createDocumentFragment(),
        node,
        lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);

      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if (document.selection && document.selection.type != "Control") {
    document.selection.createRange().pasteHTML(html);
  }
};

export const toGif = (message) => {
  var Obj = {
    emo01: "<image  height='18' src='/emoji/emoji_clapping_gif.png'/>",
    emo02: "<image  height='18' src='/emoji/emoji_laughing_gif.png'/>",
    emo03: "<image  height='18' src='/emoji/emoji_yes_gif.png'/>",
    emo04:
      "<image class='rotate' height='18' src='/emoji/emoji_smile_gif.png'/>",
  };
  let sms = message.replace(/emo01|emo02|emo03|emo04/gi, function (matched) {
    return Obj[matched];
  });
  return sms;
};

export const toImage = (message) => {
  var Obj = {
    emo01: "<image  height='18' src='/emoji/emoji_clapping.png'/>",
    emo02: "<image  height='18' src='/emoji/emoji_laughing.png'/>",
    emo03: "<image  height='18' src='/emoji/emoji_yes.png'/>",
    emo04: "<image class='rotate' height='18' src='/emoji/emoji_smile.png'/>",
  };
  let sms = message.replace(/emo01|emo02|emo03|emo04/gi, function (matched) {
    return Obj[matched];
  });
  return sms;
};

export const toTxT = (message) => {
  let sms = message;
  sms = sms.replace(
    /<img height="18" src="emoji\/emoji_clapping_gif.png">/g,
    "emo01"
  );
  sms = sms.replace(
    /<img height="18" src="emoji\/emoji_laughing_gif.png">/g,
    "emo02"
  );
  sms = sms.replace(
    /<img height="18" src="emoji\/emoji_yes_gif.png">/g,
    "emo03"
  );
  sms = sms.replace(
    /<img class="rotate" height="18" src="emoji\/emoji_smile_gif.png">/g,
    "emo04"
  );

  sms = sms.replace(
    /<img height="20" src="emoji\/emoji_clapping_gif.png">/g,
    "emo01"
  );
  sms = sms.replace(
    /<img height="20" src="emoji\/emoji_laughing_gif.png">/g,
    "emo02"
  );
  sms = sms.replace(
    /<img height="20" src="emoji\/emoji_yes_gif.png">/g,
    "emo03"
  );
  sms = sms.replace(
    /<img class="rotate" height="20" src="emoji\/emoji_smile_gif.png">/g,
    "emo04"
  );

  return sms;
};

export const toE = (message) => {
  let sms = message;
  if (message) {
    sms = sms.replace(
      /emo01|emo02|emo03|emo04|<strike>|<\/strike>|<b>|<\/b>|<i>|<\/i>|<u>|<\/u>/g,
      "e"
    );
    sms = sms.replace(/&nbsp;|&nbs/g, " ");
  }
  return sms;
};

// export const formatLatestMessage = (message) => {
//   if (message) {
//     const emojiCount = (message.match(/emo01/g) || []).length;
//     const spaceCount = (message.match(/&nbsp/g) || []).length;
//     let totalSubstrings = 4 * emojiCount + 27;
//     totalSubstrings = 5 * spaceCount + totalSubstrings;

//     const eVersion = toE(message);

//     message =
//       eVersion.length > 27
//         ? message.substring(0, totalSubstrings) + "..."
//         : message;
//     const imageVersion = toImage(message);
//     return imageVersion;
//   } else {
//     return "";
//   }
// };

export const formatLatestMessage = (message) => {
  console.log("message ", message);
  if (message) {
    const bCount = (message.match(/<b>|<i>|<u>/g) || []).length; // 7 Chars
    const strikeCount = (message.match(/<strike>/g) || []).length; // 17 Chars
    const emojiCount = (message.match(/emo01/g) || []).length;
    const spaceCount = (message.match(/&nbsp;/g) || []).length;
    const divCount = (message.match(/<div>/g) || []).length; // 11 Chars
    let totalSubstrings = 4 * emojiCount + 30;
    totalSubstrings = 5 * spaceCount + totalSubstrings;
    totalSubstrings = 7 * bCount + totalSubstrings;
    totalSubstrings = 17 * strikeCount + totalSubstrings;
    totalSubstrings = 11 * divCount + totalSubstrings;

    const eVersion = toE(message);

    message =
      eVersion.length > 30
        ? message.substring(0, totalSubstrings) + "..."
        : message;
    const imageVersion = toImage(message);
    return imageVersion;
  } else {
    return "";
  }
};

export const AvatarName = (user) => {
  return (
    user.firstname.split("")[0].toUpperCase() +
    user.lastname.split("")[0].toUpperCase()
  );
};

export const GroupChatName = (chatName) => {
  const groupChatName = chatName.split(" ");
  let gcName = "";
  if (groupChatName.length > 1) {
    gcName = `${groupChatName[0].split("")[0].toUpperCase()}${groupChatName[1]
      .split("")[0]
      .toUpperCase()}`;
  } else {
    gcName = `${groupChatName[0].split("")[0].toUpperCase()}${groupChatName[0]
      .split("")[1]
      .toUpperCase()}`;
  }
  return gcName;
};

export const getSelectionHtml = (type) => {
  var sel, range, node;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = window.getSelection().getRangeAt(0);
      let added = "";
      if (type === "bold") added = "*";
      if (type === "italic") added = "_";

      // var html = '<span style="font-weight:bold;">' + range + "</span>";
      var html = added + range + added;
      range.deleteContents();

      var el = document.createElement("div");
      el.innerHTML = html;
      var frag = document.createDocumentFragment(),
        node,
        lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    range.collapse(false);
    range.pasteHTML(html);
  }
};

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};

export const removeStyles = (sms) => {
  let str = sms;
  for (let i = 0; i < 40; i++) {
    // remove classes
    const classindex = str.indexOf(" class=");
    if (classindex !== -1) {
      const lastPosition = str.split('"', 2).join('"').length;
      const slicedStr = str.slice(classindex, lastPosition + 1);
      str = str.replace(slicedStr, "");
    }

    // remove styles
    const index = str.indexOf(" style=");
    if (index !== -1) {
      const lastPosition = str.split('"', 2).join('"').length;
      const slicedStr = str.slice(index, lastPosition + 1);
      str = str.replace(slicedStr, "");
    }
  }
  return str;
};

export const timeFormat = (time) => {
  const before = time;
  const today = moment();
  const t = moment(before).preciseDiff(today);
  const diff = t.split(" ").reverse();

  const timeDisplay = !diff.includes("days")
    ? moment(before).format("h:mm A")
    : parseInt(diff[diff.indexOf("days") + 1]) > 7
    ? moment(before).format("DD/MM/YYYY")
    : moment(before).format("ddd");

  return timeDisplay;
};

export const dayFormat = (time) => {
  const before = time;
  const today = moment();
  const t = moment(before).preciseDiff(today);
  const diff = t.split(" ").reverse();

  const timeDisplay =
    !diff.includes("days") && !diff.includes("day")
      ? diff.includes("month") ||
        diff.includes("months") ||
        diff.includes("year")
        ? moment(before).format("dddd, DD MMMM YYYY")
        : "Today"
      : parseInt(diff[diff.indexOf("days") + 1]) > 7
      ? moment(before).format("dddd, DD MMMM YYYY")
      : moment(before).format("dddd");

  return timeDisplay;
};

export const minutesDifference = (messages, m, i) => {
  if (i > 0) {
    const p = moment(messages[i - 1].createdAt).format("YYYY-MM-DD HH:m:s");
    const c = moment(m.createdAt).format("YYYY-MM-DD HH:m:s");
    const t = moment(p).preciseDiff(c);

    const diff = t.split(" ").reverse();

    if (diff.includes("minutes")) return diff[diff.indexOf("minutes") + 1];
    if (diff.includes("minute")) return diff[diff.indexOf("minute") + 1];
  }

  return 0;
};
