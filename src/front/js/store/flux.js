
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//log in and log out data
			message: null,
			isAuthenticated: false,
			userToken: null,
			user: {},
			valExercises: [],
			exercise: {},
			valMuscleGroup: [],
			MuscleGroup: {},
			//work out data
			workouts: [
				{
					day: "Day 1",
					muscle_group: "Leg",
					exercises: [
						{ name: "Pullups", reps: 8, sets: 4, rest_time: "20s", description: "" },
						{ name: "Pushups", reps: 15, sets: 4, rest_time: "20s", description: "" },
						{ name: "Bar", reps: 20, sets: 4, rest_time: "20s", description: "" },
					],
				},
				{
					day: "Day 2",
					muscle_group: "Arm",
					exercises: [
						{ name: "Pullups", reps: 10, sets: 3, rest_time: "20s", description: "" },
						{ name: "Pushups", reps: 20, sets: 3, rest_time: "20s", description: "" },
						{ name: "Bar", reps: 25, sets: 3, rest_time: "20s", description: "" },
						{ name: "Peckfly", reps: 12, sets: 3, rest_time: "20s", description: "" },
					],
				},
			],
		},
		actions: {
			// Function to handle user signup

			// se cmente el 16 de julio de 2024 a las 9:19a.m. Por GE para cr
			// createUser: async (email, password) => {
			// 	try {
			// 		const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
			// 			method: "POST",
			// 			headers: {
			// 				"Content-Type": "application/json",
			// 			},
			// 			body: JSON.stringify({ email, password }),
			// 		});
			// 		const data = await response.json();

			// 		if (response.ok) {
			// 			setStore({ message: "User created successfully" });
			// 			return true
			// 		} else {
			// 			setStore({ message: data.message });
			// 		}
			// 	} catch (error) {
			// 		console.error("Error creating user:", error);
			// 		setStore({ message: "Error creating user" });
			// 	}
			// },

			// // Function to handle user login
			// logIn: async (email, password) => {
			// 	try {
			// 		const response = await fetch(`${process.env.BACKEND_URL}/api/token`, {
			// 			method: "POST",
			// 			headers: {
			// 				"Content-Type": "application/json",
			// 			},
			// 			body: JSON.stringify({ email, password }),
			// 		});
			// 		const data = await response.json();
			// 		console.log("retona API LOGIN", data)
			// 		if (response.ok) {
			// 			setStore({
			// 				isAuthenticated: true,
			// 				userToken: data.token,
			// 				user: data.user,
			// 			});
			// 			return true;
			// 		} else {
			// 			setStore({ message: data.message });
			// 			return false;
			// 		}
			// 	} catch (error) {
			// 		console.error("Error logging in:", error);
			// 		setStore({ message: "Error logging in" });
			// 		return false;
			// 	}
			// },

			// *** Se adiciona Signup y login 16 de julio de 2024 9:22 a.m. Por GE
			postSignup: (email, password, date) => {
				console.log(email, password, date)
				fetch(process.env.BACKEND_URL + "/api/signup", {
					method: "POST",
					body: JSON.stringify({ email, password, date }), // data can be `string` or {object}!

					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(response => console.log("Success:", response))
					.catch(error => console.error("Error:", error));
			},
			postLogin: (email, password) => {
				console.log(email, password)
				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify({ email, password }), // data can be `string` or {object}!

					headers: {
						"Content-Type": "application/json"
					}

				})
					.then(res => res.json())
					.then(data_ => localStorage.setItem("accessToken", data_.Message.token))
					// .then(data2 => localStorage.setItem("accessId", data2.Message.id))
					.then(response => console.log("VALOR DE LOCALSTORAGE  *** ", localStorage.getItem('accessToken')))
					.catch(error => console.error("Error:", error));
			},

			// **** Fin se adiciona Singup y login 16 de julio de 2024 9:22 a.m. Por GE
			getExercises: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/exercises")
					const data = await resp.json()
					setStore({ valExercises: data })
					console.log("VALORES DE EXERCISES", data)
					// console.log("VALORES DE EXERCISES", data[0]["Name"])
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getOneExercise: async (id) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `/api/exercises/${id}`)
					const data = await resp.json()
					setStore({ exercise: data })
					console.log("VALORES DE EXERCISES", data)
					// console.log("VALORES DE EXERCISES", data[0]["Name"])
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getMuscleGroup: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/muscle-groups")
					const data = await resp.json()
					setStore({ valMuscleGroup: data })
					console.log("VALORES DE MuscleGroup", data)
					// console.log("VALORES DE EXERCISES", data[0]["Name"])
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getOneMuscleGroup: async (id) => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `/api/muscle-groups/${id}`)
					const data = await resp.json()
					setStore({ MuscleGroup: data })
					console.log("VALORES DE ONE MuscleGroup", data)
					// console.log("VALORES DE EXERCISES", data[0]["Name"])
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},


			getUserById: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${id}`)
					const data = await response.json()
					setStore({ user: data.user })
				} catch (error) {
					console.error(error)
				}

			},

			logOut: () => {
				setStore({ user: null });
			},



		}
	};
};

export default getState;
