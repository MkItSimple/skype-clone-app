import React from "react";
import {
  BoldIcon,
  ItablicIcon,
  StrikeThroughIcon,
  UnderlineIcon,
} from "./svg/Icons";

const RichTextEditor = () => {
  return (
    <div className="richTextEditor">
      <button>
        <BoldIcon
          onClickFunction={() => document.execCommand("bold", false, "")}
        />
      </button>
      <button>
        <ItablicIcon
          onClickFunction={() => document.execCommand("italic", false, "")}
        />
      </button>
      <button>
        <StrikeThroughIcon
          onClickFunction={() =>
            document.execCommand("strikethrough", false, "")
          }
        />
      </button>
      <button>
        <UnderlineIcon
          onClickFunction={() => document.execCommand("underline", false, "")}
        />
      </button>
    </div>
  );
};

export default RichTextEditor;
