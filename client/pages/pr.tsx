import React from "react";

const Pr = () => {
  //   let str =
  //     '<div style="box-sizing: inherit;"><div style="background: green;"><span style="box-sizing: inherit"></span></div></div>';
  let str =
    // '<div class="" style="box-sizing: inherit;"><div class="" style="box-sizing: inherit;">dummyString</span></div></div>';
    // '<span style="box-sizing: inherit; font-weight: 700; color: rgb(75, 79, 88); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 15px; background-color: rgb(255, 255, 255);"><em style="box-sizing: inherit;"><span class="has-inline-color has-luminous-vivid-orange-color" style="box-sizing: inherit; color: var(--wp--preset--color--luminous-vivid-orange)  !important;"><span style="box-sizing: inherit;"><em style="box-sizing: inherit;">Remove part of string&nbsp;</em></span></span><span style="box-sizing: inherit;"><em style="box-sizing: inherit;"><span style="box-sizing: inherit;"><em style="box-sizing: inherit;"><span style="box-sizing: inherit;"><em style="box-sizing: inherit;"><span class="has-inline-color has-vivid-purple-color" style="box-sizing: inherit; color: var(--wp--preset--color--vivid-purple)  !important;">“Javascript is popular language”</span></em></span></em></span></em></span></em></span><span style="color: rgb(75, 79, 88); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 15px; background-color: rgb(255, 255, 255);">&nbsp;</span><span style="box-sizing: inherit; font-weight: 700; color: rgb(75, 79, 88); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 15px; background-color: rgb(255, 255, 255);"><em style="box-sizing: inherit;">till index position 10</em></span>';
    '<span style="box-sizing: inherit; font-weight: 700; color: rgb(75, 79, 88); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 15px; background-color: rgb(255, 255, 255);"><em style="box-sizing: inherit;"><span class="has-inline-color has-luminous-vivid-orange-color" style="box-sizing: inherit; color: var(--wp--preset--color--luminous-vivid-orange)  !important;"><span style="box-sizing: inherit;"><em style="box-sizing: inherit;">Remove part of string&nbsp;</em></span></span><span style="box-sizing: inherit;"><em style="box-sizing: inherit;"><span style="box-sizing: inherit;"><em style="box-sizing: inherit;"><span style="box-sizing: inherit;"><em style="box-sizing: inherit;"><span class="has-inline-color has-vivid-purple-color" style="box-sizing: inherit; color: var(--wp--preset--color--vivid-purple)  !important;">“Javascript is popular language”</span></em></span></em></span></em></span></em></span><span style="color: rgb(75, 79, 88); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 15px; background-color: rgb(255, 255, 255);">&nbsp;</span><span style="box-sizing: inherit; font-weight: 700; color: rgb(75, 79, 88); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 15px; background-color: rgb(255, 255, 255);"><em style="box-sizing: inherit;">till index position 10</em></span>';

  //   const index = str.indexOf(" style=");
  //   const lastPosition = str.split('"', 2).join('"').length;
  //   const slicedStr = str.slice(index, lastPosition + 1);
  //   const removedStyles = str.replace(slicedStr, "");

  //   for (let i = 0; i < 10; i++) {
  //     const index = str.indexOf(" class=");
  //     if (index !== -1) {
  //       const lastPosition = str.split('"', 2).join('"').length;
  //       const slicedStr = str.slice(index, lastPosition + 1);
  //       str = str.replace(slicedStr, "");
  //     }
  //   }

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

  const message =
    "<span><b><i><u>cho</u></i></b></span><span>-<b>ba</b>sed</span><span>. The ch</span>";

  const bCount = (message.match(/<b>|<i>|<u>/g) || []).length; // 7 Chars
  const spanCount = (message.match(/<span>/g) || []).length; // 13 Chars
  const divCount = (message.match(/<div>/g) || []).length; // 11 Chars

  const replaceThem = "<b>hey</b> <u></u> <i></i> <strike></strike>".replace(
    /<strike>|<\/strike>|<b>|<\/b>|<i>|<\/i>|<u>|<\/u>/g,
    "e"
  );

  return (
    <>
      <div>{str}</div>
      <div>{bCount}</div>
      <div>{spanCount}</div>
      <div>{replaceThem}</div>
      {/* <div>{index}</div>
      <div>{lastPosition}</div>
      <div>{slicedStr}</div>*/}
      {/* <div>{removedStyles}</div> */}
    </>
  );
};

export default Pr;

/*
<span style="background: #23978;"></span>




https://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
https://thispointer.com/delete-part-of-string-by-index-position-in-javascript/






"<div class=\"\" style=\"box-sizing: inherit; display: table-row; margin: 0px; border: 0px solid rgb(255, 255, 255); list-style: none; font-size: 12px; line-height: 1.7em; min-height: 14px; padding: 5px 5px 1px 14px; color: rgb(170, 170, 170); font-family: &quot;Source Code Pro&quot;, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, Courier, monospace; white-space: pre-wrap; background-color: rgb(255, 255, 255);\"><div style=\"box-sizing: inherit; display: table-cell; padding-left: 10px; border-left: 4px solid rgb(82, 206, 82);\"><span class=\"enlighter-k2\" style=\"box-sizing: inherit; margin: 0px; padding: 0px; line-height: inherit; font-size: 1.25em; font-family: inherit; color: rgb(64, 66, 71); font-weight: 700;\">et</span><span class=\"enlighter-text\" style=\"box-sizing: inherit; margin: 0px; padding: 0px; line-height: inherit; font-size: 1.25em; font-family: inherit; color: rgb(0, 0, 0);\"> dummyString = </span><span class=\"enlighter-s0\" style=\"box-sizing: inherit; margin: 0px; padding: 0px; line-height: inherit; font-size: 1.25em; font-family: inherit; color: rgb(45, 71, 230);\">'Javascript is popular language'</span><span class=\"enlighter-text\" style=\"box-sizing: inherit; margin: 0px; padding: 0px; line-height: inherit; font-size: 1.25em; font-family: inherit; color: rgb(0, 0, 0);\"></span></div></div><div class=\"\" style=\"box-sizing: inherit; display: table-row; margin: 0px; border: 0px solid rgb(255, 255, 255); list-style: none; font-size: 12px; line-height: 1.7em; min-height: 14px; padding: 1px 5px 1px 14px; color: rgb(170, 170, 170); background-color: rgb(248, 248, 248); font-family: &quot;Source Code Pro&quot;, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, Courier, monospace; white-space: pre-wrap;\"><div style=\"box-sizing: inherit; display: table-cell; padding-left: 10px; border-left: 4px solid rgb(82, 206, 82);\"><span class=\"enlighter-text\" style=\"box-sizing: inherit; margin: 0px; padding: 0px; line-height: inherit; font-size: 1.25em; font-family: inherit; color: rgb(0, 0, 0);\">dummyStrin</span></div></div>"

*/
