
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
			MuscleGroup: {},
			//work out data
			muscle_groups: [],
			workouts: [
				{
					id: "1",
					name: "Plan 1",
					days: [
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
				{
					id: "2",
					plan_name: "Plan 2",
					days: [
						{
							day: "Day 1",
							muscle_group: "Chest",
							exercises: [
								{ name: "Bench Press", reps: 10, sets: 4, rest_time: "30s", description: "" },
								{ name: "Dumbbell Flyes", reps: 12, sets: 4, rest_time: "30s", description: "" },
								{ name: "Pushups", reps: 20, sets: 4, rest_time: "30s", description: "" },
							],
						},
						{
							day: "Day 2",
							muscle_group: "Back",
							exercises: [
								{ name: "Pullups", reps: 10, sets: 4, rest_time: "30s", description: "" },
								{ name: "Deadlift", reps: 8, sets: 4, rest_time: "30s", description: "" },
								{ name: "Barbell Rows", reps: 10, sets: 4, rest_time: "30s", description: "" },
							],
						},
				  ],
				},  
			],
			
			//member data
			// members data
			members: [], // Para almacenar una lista de miembros
			member: null // Para almacenar un miembro específico

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

			//EXERCISES FETCH ZONE
			getMuscleGroups: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/muscle-groups`);
					const data = await response.json();
					setStore({ muscle_groups: data });
				} catch (error) {
					console.error("Error fetching muscle groups:", error);
				}
			},
			
			getWorkouts: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/workouts`);
					const data = await response.json();
					setStore({ workouts: data });
				} catch (error) {
					console.error("Error fetching workouts:", error);
				}
			},

			getWorkoutById: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/workouts/${id}`);
					const data = await response.json();
					setStore({ workouts: store.workouts.map(workout => workout.id === id ? data : workout) });
				} catch (error) {
					console.error("Error fetching workout by ID:", error);
				}
			},

			createWorkout: async (workout) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/workouts`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${getStore().userToken}`
						},
						body: JSON.stringify(workout),
					});
					const data = await response.json();
					if (response.ok) {
						setStore({ workouts: [...getStore().workouts, data] });
					} else {
						console.error("Error creating workout:", data.message);
					}
				} catch (error) {
					console.error("Error creating workout:", error);
				}
			},

			updateWorkout: async (id, updatedWorkout) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/workouts/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${getStore().userToken}`
						},
						body: JSON.stringify(updatedWorkout),
					});
					const data = await response.json();
					if (response.ok) {
						setStore({
							workouts: getStore().workouts.map(workout => workout.id === id ? data : workout)
						});
					} else {
						console.error("Error updating workout:", data.message);
					}
				} catch (error) {
					console.error("Error updating workout:", error);
				}
			},

			deleteWorkout: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/workouts/${id}`, {
						method: "DELETE",
						headers: {
							"Authorization": `Bearer ${getStore().userToken}`
						},
					});
					if (response.ok) {
						setStore({
							workouts: getStore().workouts.filter(workout => workout.id !== id)
						});
					} else {
						console.error("Error deleting workout");
					}
				} catch (error) {
					console.error("Error deleting workout:", error);
				}
			},

			//MEMBERS ZONE
			getAllMembers: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/members`, {
						headers: {
							"Authorization": `Bearer ${getStore().userToken}`, // Add token for authentication
						}
					});
					const data = await response.json();
					if (response.ok) {
						setStore({ members: data });
					} else {
						console.error('Error fetching members:', data.message);
					}
				} catch (error) {
					console.error("Error fetching members:", error);
				}

				
			},

			// Function to create a new member
			createMember: async (memberData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/members`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${getStore().userToken}`, // Add token for authentication
						},
						body: JSON.stringify(memberData),
					});
					const data = await response.json();
					if (response.ok) {
						setStore({ message: "Member created successfully" });
						return true;
					} else {
						setStore({ message: data.message });
						return false;
					}
				} catch (error) {
					console.error("Error creating member:", error);
					setStore({ message: "Error creating member" });
					return false;
				}
			},

			// Function to get a member by ID
			getMemberById: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/members/${id}`, {
						headers: {
							"Authorization": `Bearer ${getStore().userToken}`, // Add token for authentication
						}
					});
					const data = await response.json();
					if (response.ok) {
						setStore({ member: data });
					} else {
						console.error('Error fetching member by ID:', data.message);
					}
				} catch (error) {
					console.error("Error fetching member by ID:", error);
				}
			},

			// Function to update a member
			updateMember: async (id, memberData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/members/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${getStore().userToken}`, // Add token for authentication
						},
						body: JSON.stringify(memberData),
					});
					const data = await response.json();
					if (response.ok) {
						setStore({ message: "Member updated successfully" });
						return true;
					} else {
						setStore({ message: data.message });
						return false;
					}
				} catch (error) {
					console.error("Error updating member:", error);
					setStore({ message: "Error updating member" });
					return false;
				}
			},

			// Function to delete a member
			deleteMember: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/members/${id}`, {
						method: "DELETE",
						headers: {
							"Authorization": `Bearer ${getStore().userToken}`, // Add token for authentication
						},
					});
					if (response.ok) {
						setStore({
							members: getStore().members.filter(member => member.id !== id)
						});
					} else {
						console.error('Error deleting member');
					}
				} catch (error) {
					console.error('Error deleting member:', error);
				}
			},
		},	
	};
};

		

export default getState;
