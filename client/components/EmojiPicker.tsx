import Image from "next/image";
import React from "react";
type Props = {
  emojiClicked: (value: string) => void;
};
const EmojiPicker = ({ emojiClicked }: Props) => {
  return (
    <div className="emojis__container">
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
        <Image
          onClick={() => emojiClicked("emoji/emoji_yes_gif")}
          src={"/emoji/emoji_yes_gif.png"}
          height={25}
          width={25}
          alt=""
        />
        <Image
          className="rotate"
          onClick={() => emojiClicked("emoji/emoji_smile_gif")}
          src={"/emoji/emoji_smile_gif.png"}
          height={25}
          width={25}
          alt=""
        />
      </div>
    </div>
  );
};

export default EmojiPicker;
