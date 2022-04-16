import "./App.css";

import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const App = () => {
	return (
		<>
			<div className="app">
				<Formik
					initialValues={{
						email: "",
						name: "",
					}}
					onSubmit={async (values) => {
						let res = await fetch("http://localhost:8080/api/post", {
							method: "POST",
							body: JSON.stringify(values),
						});
						let resJson = await res.json();
						// console.log(resJson);
						if (res.status === 200) {
							console.log(JSON.stringify(resJson));
						} else {
							alert("Some error occured");
						}
					}}
					///yup
					validationSchema={Yup.object().shape({
						email: Yup.string().email("invalid email").required("Required"),
						name: Yup.string()
							.required("required")
							.min(2, "Too Short!")
							.max(50, "Too Long!"),
					})}
				>
					{(props) => {
						const {
							values,
							touched,
							errors,
							dirty,
							isSubmitting,
							handleChange,
							handleBlur,
							handleSubmit,
							handleReset,
						} = props;
						return (
							<form onSubmit={handleSubmit}>
								<label htmlFor="email" style={{ display: "block" }}>
									Email
								</label>
								<input
									id="email"
									placeholder="Enter your email"
									type="text"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										errors.email && touched.email
											? "text-input error"
											: "text-input"
									}
								/>
								{errors.email && touched.email && (
									<div className="input-feedback">{errors.email}</div>
								)}

								<label htmlFor="name" style={{ display: "block" }}>
									name
								</label>
								<input
									id="name"
									placeholder="Enter your name"
									type="text"
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										errors.name && touched.name
											? "text-input error"
											: "text-input"
									}
								/>
								{errors.name && touched.name && (
									<div className="input-feedback">{errors.name}</div>
								)}

								<button
									type="button"
									className="outline"
									onClick={handleReset}
									disabled={!dirty || isSubmitting}
								>
									Reset
								</button>
								<button type="submit" disabled={isSubmitting}>
									Submit
								</button>
							</form>
						);
					}}
				</Formik>
			</div>
		</>
	);
};

export default App;
