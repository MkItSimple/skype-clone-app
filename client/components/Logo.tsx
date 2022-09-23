import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="logo__container">
      <div className="image_container">
        <Image
          src={"/emoji/skype-400x176.png"}
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </div>
    </div>
  );
};

export default Logo;
