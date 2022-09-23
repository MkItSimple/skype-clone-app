import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
const ModalProfile = () => {
  const { user, setUser, setOpenModalProfile } = useApp();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [previewSource, setPreviewSource] = useState("");

  const [editName, setEditName] = useState(false);
  const [openUploadOptions, setopenUploadOptions] = useState(false);

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const viewPhotoHandler = async () => {
    console.log("viewPhotoHandler");
    setopenUploadOptions(false);
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setPreviewSource(reader.result as string);
    };
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let files = e.currentTarget.files;
    if (files) {
      console.log("not firing ", files[0]);
      await readFile(files[0]);
    }
  };

  const onBtnClick = () => {
    if (inputFileRef && inputFileRef.current) inputFileRef.current.click();
  };

  const removePhotoHandler = async () => {
    console.log("removePhotoHandler");

    setPreviewSource("");
    setopenUploadOptions(false);
  };

  const updatedHandler = () => {
    setOpenModalProfile(false);
    toast("Profile Upadted!", {
      type: "success",
      position: "top-center",
    });
  };

  const saveHandler = async () => {
    setLoading(true);
    let updates = {};
    if (
      firstName === user.firstname &&
      lastName === user.lastname &&
      previewSource === user.avatarImage
    ) {
      setOpenModalProfile(false);
      setLoading(false);
      return;
    }

    if (firstName.length < 2 || lastName.length < 2) {
      toast("first and last name should be greater than 3 characters.", {
        type: "error",
        position: "top-center",
      });
      setLoading(false);
      return;
    }

    if (firstName !== user.firstname) {
      updates = { ...updates, firstname: firstName };
    }
    if (lastName !== user.lastname) {
      updates = { ...updates, lastname: lastName };
    }

    if (previewSource && previewSource !== user.avatarImage.url) {
      let uploadResponse = "";
      user.avatarImage.public_id &&
        (await removeImageApi(user.avatarImage.public_id, user.token));

      await uploadImageApi(previewSource, user.token).then(async (res: any) => {
        // console.log("imageResponse ", res.data);
        uploadResponse = res.data;
      });

      updates = { ...updates, avatarImage: uploadResponse };
      // console.log("updated new ", updates);

      await updateUserApi(updates, user.token)
        .then((res) => {
          const updatedUser = user;
          Object.assign(updatedUser, updates);
          localStorage.setItem("userInfo", JSON.stringify(updatedUser));
          setUser({ ...user, updatedUser });
          updatedHandler();
        })
        .catch((error: any) => {
          console.log(error);
        });

      setLoading(false);
      return;
    }

    if (!previewSource) {
      console.log("Remove Avatar");
      updates = { ...updates, avatarImage: { public_id: "", url: "" } };
      await updateUserApi(updates, user.token)
        .then((res) => {
          const updatedUser = user;
          Object.assign(updatedUser, updates);
          localStorage.setItem("userInfo", JSON.stringify(updatedUser));
          setUser({ ...user, updatedUser });
          updatedHandler();
        })
        .catch((error: any) => {});
      setLoading(false);
      return;
    }

    if (previewSource) {
      await updateUserApi(updates, user.token)
        .then((res) => {
          const updatedUser = user;
          Object.assign(updatedUser, updates);
          localStorage.setItem("userInfo", JSON.stringify(updatedUser));
          setUser({ ...user, updatedUser });
          updatedHandler();
        })
        .catch((error: any) => {});
      setLoading(false);
      return;
    }

    setEditName(false);
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstname);
      setLastName(user.lastname);
      if (user.avatarImage) {
        setPreviewSource(user.avatarImage.url);
      }
    }
  }, [user]);

  return (
    <MPContainer>
      <div
        className="modal"
        onClick={() => openUploadOptions && setopenUploadOptions(false)}
      >
        {loading && <div className="loading">Loading...</div>}
        <div className="modal__header">
          <div className="blue__bg"></div>
          <div className="exit" onClick={() => setOpenModalProfile(false)}>
            <ExitIcon />
          </div>
          <div className="update__avatar">
            <div
              className="image_container"
              onClick={() => setopenUploadOptions(!openUploadOptions)}
            >
              {previewSource ? (
                <Image
                  src={previewSource}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="name__avatar">
                  {user.firstname.split("")[0].toUpperCase()}
                  {user.lastname.split("")[0].toUpperCase()}
                </div>
              )}

              {openUploadOptions && (
                <div className="options__container">
                  <div className="option" onClick={onBtnClick}>
                    Upload Photo
                  </div>
                  <div className="option" onClick={viewPhotoHandler}>
                    View Photo
                  </div>
                  <div className="option" onClick={removePhotoHandler}>
                    Remove Photo
                  </div>
                </div>
              )}

              <div className="hover__div">
                <CameraIcon />
              </div>
            </div>
          </div>
          <div className="update__name">
            <input
              type="text"
              className="name"
              disabled={!editName}
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className="name"
              disabled={!editName}
              value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className="name_edit_btn_container">
              {editName ? (
                <div onClick={() => setEditName(false)}>
                  <OkIcon />
                </div>
              ) : (
                <div onClick={() => setEditName(true)}>
                  <EditIcon />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="cancel" onClick={() => setOpenModalProfile(false)}>
            Cancel
          </div>
          <div className="save" onClick={saveHandler}>
            Save
          </div>
          <input
            className="file__input"
            type="file"
            ref={inputFileRef}
            onChange={handleFileInputChange}
          />
        </div>
      </div>
      <BackDrop />
    </MPContainer>
  );
};

export default ModalProfile;
import styled from "styled-components";
import { updateUserApi } from "../../api/auth";
import { useApp } from "../../context/AppContext";
import BackDrop from "./BackDrop";
import { CameraIcon, EditIcon, ExitIcon, OkIcon } from "../svg/Icons";
import { toast } from "react-toastify";
import { removeImageApi, uploadImageApi } from "../../api/cloudinary";
const MPContainer = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    min-height: 350px;
    max-height: 500px;
    min-width: 450px;
    background-color: white;
    z-index: 20;
    border-radius: 0.5em;
    position: relative;

    .loading {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      background-color: rgba(255, 255, 255, 0.9);
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      letter-spacing: 1px;
    }
  }

  .modal__header {
    position: relative;
  }
  .blue__bg {
    width: 100%;
    height: 120px;
    background-image: linear-gradient(to right, var(--sky400), var(--sky600));
    border-radius: 0.5em 0.5em 0em 0em;
  }
  .exit {
    height: 25px;
    width: 25px;
    position: absolute;
    top: 1em;
    right: 1em;
    z-index: 20;
    &:hover {
      cursor: pointer;
    }

    svg {
      color: white;
    }
  }
  .update__avatar {
    width: 100%;
    height: auto;

    position: absolute;
    top: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .choose_action {
    display: block;
    height: 100%;
    width: 100%;
    background-color: pink;
    z-index: 50;
    svg {
      fill: var(--color200);
    }
  }

  .image_container {
    height: 133px;
    width: 130px;
    border-radius: 50%;
    position: relative;
    &:hover {
      .choose__avatar {
        display: flex;
      }
      .hover__div {
        display: flex;
      }
    }
    img {
      border-radius: 50%;
    }

    .name__avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-image: linear-gradient(
        to bottom,
        var(--sky100),
        var(--sky400)
      );
      font-size: 37px;
      font-weight: 700;
      letter-spacing: 5px;
      color: var(--sky700);
    }

    .hover__div {
      position: absolute;
      top: 0px;
      height: 133px;
      width: 130px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      &:hover {
        cursor: pointer;
      }

      svg {
        color: var(--color200);
        height: 40px;
        width: 40px;
      }
    }
  }

  .options__container {
    min-width: 200px;
    background-color: white;
    padding: 5px 0px;
    z-index: 20;
    border: 1px solid var(--gray500);

    position: absolute;
    bottom: -20px;
  }

  .option {
    font-size: 11px;
    padding: 0.3em 1em;
    &:hover {
      background-color: var(--color100);
      cursor: pointer;
    }
  }

  label {
    display: block;
    width: 100%;
  }
  .file__input {
    display: none;
  }

  .update__name {
    text-align: center;
    padding: 2em 1em 1em 1em;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .name {
    width: 100%;
    font-size: 30px;
    font-weight: 700;
    color: var(--gray600);
    background-color: transparent;
    outline: none;
    border: none;
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    &::placeholder {
      color: var(--gray300);
    }
  }
  .name_edit_btn_container {
    position: absolute;
    top: 3em;
    right: 2em;
    height: 27px;
    width: 27px;

    svg {
      fill: var(--gray400);
      &:hover {
        fill: var(--gray500);
        cursor: pointer;
      }
    }
  }

  .footer {
    height: auto;
    width: 100%;
    padding: 2em;
    color: white;
    text-align: center;
    position: absolute;
    bottom: 0px;

    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
  }
  .save,
  .cancel {
    width: 130px;
    color: white;

    background-color: var(--sky500);
    font-family: "Gilroy Light";
    font-size: 14px;
    padding: 0.7em 1em;

    border-radius: 2em;
    &:hover {
      background-image: linear-gradient(to right, var(--sky400), var(--sky500));
      cursor: pointer;
    }
  }
`;
