import { useState, React } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Form.module.css";

export default function Form() {
  const errMess = {
    req: "Please fill this out",
  };

  const RegisterSchema = yup.object().shape({
    firstname: yup
      .string()
      .label("First Name")
      .required(errMess.req)
      .min(2)
      .max(20),
    lastname: yup
      .string()
      .label("Last Name")
      .required(errMess.req)
      .min(2)
      .max(20),
    email: yup
      .string()
      .label("Email Address")
      .required(errMess.req)
      .min(10)
      .max(150)
      .email("Invalid Email Address"),
    address: yup
      .string()
      .label("Address")
      .required(errMess.req)
      .min(10)
      .max(150),
    mobile: yup
      .string()
      .label("Mobile")
      .required(errMess.req)
      .matches(/09[0-9]{9}/, "Mobile number is incorrect")
      .max(11, "Mobile number is too long"),
    tupstudent: yup
      .string()
      .label("TUP Student")
      .required("Old TUP Student? is required"),
    message: yup
      .string()
      .label("Message")
      .required(errMess.req)
      .min(10)
      .max(250, "The max length of 250 characters in Message is reached"),
  });

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(RegisterSchema),
  });

  const SelectValidator = async (value) => {
    await trigger(["select"]);
  };

  const submitForm = async (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      "http://localhost:3001/register",
      requestOptions
    );
    const jsonData = await response.json();

    alert(JSON.stringify(jsonData));
  };

  return (
    <section className={styles.containers}>
      <span className={styles.bubbles1}></span>
      <span className={styles.bubbles2}></span>
      <span className={styles.bubbles3}></span>
      <span className={styles.bubbles4}></span>
      <span className={styles.bubbles5}></span>
      <span className={styles.bubbles6}></span>
      <span className={styles.bubbles7}></span>
      <span className={styles.bubbles8}></span>
      <div className={styles.formcontainer}>
        <form onSubmit={handleSubmit((data) => submitForm(data))}>
          {" "}
          <h1>Registration Form</h1>
          <div className={styles.flexBox}>
            <div className={styles.flexBox1}>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("firstname", { required: true })}
                />
                <p>{errors.firstname?.message}</p>
              </div>
              <div className={styles.inputBox}>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <p>{errors.email?.message}</p>
              </div>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  {...register("address", { required: true })}
                />
                <p>{errors.address?.message}</p>
              </div>
            </div>
            <div className={styles.flexBox2}>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastname", { required: true })}
                />
                <p>{errors.lastname?.message}</p>
              </div>
              <div className={styles.inputBox}>
                <input
                  type="tel"
                  name="number"
                  placeholder="Mobile (09123456789)"
                  {...register("mobile", { required: true })}
                />
                <p>{errors.mobile?.message}</p>
              </div>
              <div className={styles.inputBox}>
                <select
                  defaultValue=""
                  {...register("tupstudent")}
                  onChange={(e) => SelectValidator(e.target.value)}
                >
                  <option value="" disabled>
                    Old TUP Student?
                  </option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
                <p>{errors.tupstudent?.message}</p>
              </div>
            </div>
          </div>
          <div className={styles.inputBox}>
            <textarea
              as="textarea"
              rows={5}
              placeholder="Why do want to study here?"
              {...register("message")}
            ></textarea>
            <p>{errors.message?.message}</p>
          </div>
          <div className={styles.inputBox}>
            <input type="submit" name="submit" values="Submit" />
          </div>
        </form>
      </div>
    </section>
  );
}
