
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//log in and log out data
			message: null,
			isAuthenticated: false,
			userToken: null,
			user: {},
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

			// *** Se adiciona Signup y login 16 de julio de 2024 9:22 a.m. Por GE
			postSignup: (email, password, date) => {
				console.log(email, password, date)
				fetch(process.env.BACKEND_URL + "api/signup", {
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
			postLogin: (data) => {
				console.log(data)
				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify(data), // data can be `string` or {object}!

					headers: {
						"Content-Type": "application/json"
					}

				})
					.then(res => res.json())
					.then(data_ => localStorage.setItem("accessToken", data_.Message.token))
					.then(response => console.log(localStorage.getItem('accessToken')))
					.catch(error => console.error("Error:", error));
			},

			// **** Fin se adiciona Singup y login 16 de julio de 2024 9:22 a.m. Por GE




			// Function to handle user login
			logIn: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/token`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					});
					const data = await response.json();

					if (response.ok) {
						setStore({
							isAuthenticated: true,
							userToken: data.token,
							user: data.user,
						});
						return true;
					} else {
						setStore({ message: data.message });
						return false;
					}
				} catch (error) {
					console.error("Error logging in:", error);
					setStore({ message: "Error logging in" });
					return false;
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
