import Image from "next/image";
import { useRef, useState, useLayoutEffect } from "react";
import { insertEmojiHandler } from "../utils/customFunctions";

const Ce = () => {
  const inputRef = useRef();
  const [cePosition, setCePosition] = useState(0);
  const [nodeIndex, setNodeIndex] = useState([]);

  const [anchorOffset, setAnchorOffset] = useState(0);
  const [anchorNode, setAnchorNode] = useState();

  const emojiClicked = (emoji) => {
    var el = document.getElementsByClassName("ce")[0];
    var range = document.createRange();
    var sel = window.getSelection();

    const ni = !nodeIndex ? 0 : nodeIndex;

    const destination =
      cePosition < el.childNodes[ni].length
        ? cePosition
        : el.childNodes[ni].length;

    range.setStart(el.childNodes[ni], destination);
    // range.setStart(el, anchorOffset);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
      const customClass = emoji.includes("smile") ? "class='rotate'" : "";
      insertEmojiHandler(
        `&nbsp<img ${customClass} height='20' src='${emoji}.png'/>&nbsp`
      );
      setNodeIndex((prev) => prev + 2);
    }, 200);
  };

  const getRange = () => {
    const r = window.getSelection().getRangeAt(0).startOffset;
    console.log("range ", r);
    setCePosition(r);

    var el = document.getElementsByClassName("ce")[0];
    var s = window.getSelection();
    var an = s.anchorNode;
    var fn = s.focusNode;
    var ao = s.anchorOffset;

    var childNodes = el.childNodes;
    var count = childNodes.length;
    var child_index;

    console.log("childNodes ", childNodes);
    // console.log("fn ", an.previousSibling);
    for (var i = 0; i < count; ++i) {
      // console.log(
      //   i,
      //   "previousSibling ",
      //   childNodes[i].previousSibling,
      //   "nextSibling",
      //   childNodes[i].nextSibling
      // );
      if (an === childNodes[i]) {
        child_index = i;
        console.log("nodeIndex ", nodeIndex);
        break;
      }
    }
    // console.log("ao ", an);
    console.log("an", an);
    setNodeIndex(child_index);
    setAnchorOffset(ao);
  };

  const keyUpHandler = () => {
    console.log("keyUpHandler");
    setCePosition(cePosition + 1);
  };

  const image = '<img height="20" src="emoji/emoji_clapping_gif.png">';
  const space = "&nbsp;";
  // sd [text, img, text, br, br]
  return (
    <RootDiv>
      <div
        className={"ce"}
        contentEditable={true}
        suppressContentEditableWarning={true}
        ref={inputRef}
        onClick={getRange}
        onKeyDown={keyUpHandler}
        dangerouslySetInnerHTML={{
          __html: `ch${space}${image}${space}oreyn anania<br><br><br>`,
        }}
      ></div>

      <div className="emojis">
        <Image
          onClick={() => emojiClicked("emoji/emoji_clapping_gif")}
          src={"/emoji/emoji_clapping_gif.png"}
          height={25}
          width={25}
          alt=""
        />
        <Image
          onClick={() => emojiClicked("emoji/emoji_laughing_gif")}
          src={"/emoji/emoji_laughing_gif.png"}
          height={25}
          width={25}
          alt=""
        />
      </div>

      <div>node index {nodeIndex}</div>
      <div>cePosition {cePosition}</div>
      <div>anchorNode {anchorNode}</div>
      <div>anchorOffset {anchorOffset}</div>
    </RootDiv>
  );
};

export default Ce;
import styled from "styled-components";
import DOMPurify from "dompurify";
const RootDiv = styled.div`
.ce{
  margin 1em;
  padding: 1em;
  border: 1px solid #e8e8e1;
}
`;

/*

childNodes[i].nodeName      // IMG #text BR



[a b c]

*/
