"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import CustomModal from "./components/customModal";
import axios from "axios";
import Image from "next/image";
import cross from "../assests/cross-23.png";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userName: "",
    contact: "",
    profileUrl: "",
  });
  const [validation, setValidation] = useState(false);
  const handleFormData = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };
  const sunmitForm = async () => {
    try {
      const data = await axios.post(
        "http://localhost:4000/submit-registation",
        formData
      );
      setOpen(false);
      setFormData({
        name: "",
        email: "",
        userName: "",
        contact: "",
        profileUrl: "",
      });
      fetchAllUser();
    } catch (err) {
      console.log(err);
    }
  };
  const handleForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.userName ||
      !formData.contact ||
      !formData.profileUrl
    ) {
      setValidation(true);
    } else {
      setValidation(false);
      sunmitForm();
    }
  };
  const fetchAllUser = async () => {
    const data = await axios.get("http://localhost:4000/get-all-user");
    setUserData(data.data);
  };
  useEffect(() => {
    fetchAllUser();
  }, []);
  console.log({ userData });
  const handleUpload = async (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    try {
      const data = await axios.post(
        "http://localhost:4000/upload-image",
        formData
      );
      console.log(data);
      setFormData((prev) => ({ ...prev, profileUrl: data.data.url }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const data = await axios.delete(
        `http://localhost:4000/delete-user/${id}`
      );
      fetchAllUser();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.ragistation}>User Registration</p>{" "}
        <button className={styles.button} onClick={() => setOpen(true)}>
          Create
        </button>
      </div>
      <table className={styles.table}>
        <tr>
          <th>Person Name</th>
          <th>Email Id</th>
          <th>User Name</th>
          <th>Contact Info</th>
          <th>Action</th>
        </tr>
        {userData?.data?.map((item) => (
          <tr key={item?._id}>
            <td onClick={()=>{setShow(true)
            setFormData(item)
            }} className={styles.nameLink}>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.userName}</td>
            <td>{item.contact}</td>
            <td className={styles.edit_delete}>
              <button
                className={styles.button}
                onClick={() => {
                  setFormData(item);
                  setOpen(true);
                }}
              >
                Edit
              </button>
              <button
                className={styles.delete}
                onClick={() => handleDelete(item?._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
      <CustomModal isOpen={open} onClose={() => setOpen(false)}>
        <div>
          <p className={styles.center}>Registration </p>
          <div className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="name">
                Person Name <span className={styles.mendatary}>*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleFormData(e, "name")}
              />
              {validation && !formData.name && (
                <p className={styles.error}>Please Enter Person Name</p>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="email">
                Email Id <span className={styles.mendatary}>*</span>
              </label>
              <input
                id="email"
                type="text"
                onChange={(e) => handleFormData(e, "email")}
                value={formData.email}
              />
              {validation && !formData.email && (
                <p className={styles.error}>Please Enter Email Id</p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="userName">
                User Name <span className={styles.mendatary}>*</span>
              </label>
              <input
                id="userName"
                type="text"
                value={formData.userName}
                onChange={(e) => handleFormData(e, "userName")}
              />
              {validation && !formData.userName && (
                <p className={styles.error}>Please Enter User Name</p>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="contact">
                Contact <span className={styles.mendatary}>*</span>
              </label>
              <input
                id="contact"
                type="number"
                value={formData.contact}
                onChange={(e) => handleFormData(e, "contact")}
              />
              {validation && !formData.contact && (
                <p className={styles.error}>Please Enter Contact</p>
              )}
            </div>
            <div className={styles.profile}>
              <label htmlFor="Profile">
                Profile Picture <span className={styles.mendatary}>*</span>
              </label>
              {formData.profileUrl ? (
                <div className={styles.img_con}>
                  <Image
                    src={formData.profileUrl}
                    alt="profile"
                    className={styles.profile_img}
                    width={"100"}
                    height={"100"}
                  />
                  <span
                    className={styles.change_image}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, profileUrl: "" }))
                    }
                  >
                    <Image
                      src={cross}
                      alt="profile"
                      width={"20"}
                      height={"20"}
                    />
                  </span>
                </div>
              ) : (
                <input
                  id="Profile"
                  type="file"
                  onChange={(e) => handleUpload(e)}
                />
              )}
              {validation && !formData.profileUrl && (
                <p className={styles.error}>Please Upload Profile Picture</p>
              )}
            </div>
          </div>
          <div className={styles.btn_container}>
            <button className={styles.button} onClick={() => {setOpen(false)
            setFormData({
              name: "",
              email: "",
              userName: "",
              contact: "",
              profileUrl: "",
            })
            }}>
              Close
            </button>
            <button className={styles.button} onClick={() => handleForm()}>
              Submit
            </button>
          </div>
        </div>
      </CustomModal>

      <CustomModal isOpen={show} onClose={() => setShow(false)}>
      {/* view user data */}
      <div>
        <div className={styles.view}>
          <p className={styles.center}>User Details</p>
          <div className={styles.view_data}>
            <div className={styles.view_field}>
              <label htmlFor="name">Person Name</label>
              <p>{formData.name}</p>
            </div>
            <div className={styles.view_field}>
              <label htmlFor="email">Email Id</label>
              <p>{formData.email}</p>
            </div>
            <div className={styles.view_field}>
              <label htmlFor="userName">User Name</label>
              <p>{formData.userName}</p>
            </div>
            <div className={styles.view_field}>
              <label htmlFor="contact">Contact</label>
              <p>{formData.contact}</p>
            </div>
            
          </div>
          <div className={styles.profile} style={{marginTop:"1rem"}}>
              <label htmlFor="Profile">Profile Picture</label>
              {formData.profileUrl ? (
                <div className={styles.img_con}>
                  <Image
                    src={formData.profileUrl}
                    alt="profile"
                    className={styles.profile_img}
                    width={"100"}
                    height={"100"}
                  />
                </div>
              ) : (
                <p>No Image</p>
              )}
            </div>
          <div className={styles.btn_container}>
            <button className={styles.button} onClick={() => setShow(false)}>
              Close
            </button>
              </div>
        </div>
      </div>
      
      </CustomModal>

    </div>
  );
}
