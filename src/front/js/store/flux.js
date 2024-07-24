
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Authentication data
			message: null,
			isAuthenticated: false,
			userToken: null,
			user: {},
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
						name: "Plan 2",
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

				],	
		
			muscle_groups: [],
			exercises: [],
			exercise: {},
			muscle_group: {},
			
			
		    // members data
			members: [], // Para almacenar una lista de miembros
			member: null, // Para almacenar un miembro específico
			measurements: [], // New state for storing measurements
            graphics: [] // New state for storing graphics
		},

		actions: {
			

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
					.then(res => {
						if (!res.ok) {
							throw new Error(`HTTP error! status: ${res.status}`);
						}
						return res.json();
					})
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
			// Fetching exercises and muscle groups
			getExercises: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/exercises")
					const data = await resp.json()
					setStore({ valExercises: data })
					console.log("VALORES DE EXERCISES", data)
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			// getOneExercise: async (id) => {
			// 	try {
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + `/api/exercises/${id}`)
			// 		const data = await resp.json()
			// 		setStore({ exercise: data })
			// 		console.log("VALORES DE EXERCISES", data)
			// 		// console.log("VALORES DE EXERCISES", data[0]["Name"])
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	} catch (error) {
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
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

			//Aditional Actions
			updateExercise: (id, exerciseData) => {
				setStore({
					exercises: getStore().exercises.map(exercise => exercise.id === id ? { ...exercise, ...exerciseData } : exercise)
				});
			},

			updateMuscleGroup: (id, muscleGroupData) => {
				setStore({
					muscleGroups: getStore().muscleGroups.map(muscleGroup => muscleGroup.id === id ? { ...muscleGroup, ...muscleGroupData } : muscleGroup)
				});
			},
			// Function to fetch measurements data for a specific member
			getMeasurementsByMemberId: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/members/${id}/measurements`, {
						headers: {
							"Authorization": `Bearer ${getStore().userToken}`,
						},
					});
					const data = await response.json();
					if (response.ok) {
						setStore({ measurements: data });
					} else {
						console.error('Error fetching measurements:', data.message);
					}
				} catch (error) {
					console.error("Error fetching measurements:", error);
				}
			},

			// Function to fetch graphics data for a specific member
			getGraphicsByMemberId: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/members/${id}/graphics`, {
						headers: {
							"Authorization": `Bearer ${getStore().userToken}`,
						},
					});
					const data = await response.json();
					if (response.ok) {
						setStore({ graphics: data });
					} else {
						console.error('Error fetching graphics:', data.message);
					}
				} catch (error) {
					console.error("Error fetching graphics:", error);
				}
			},

			// Function to create a new measurement for a member
			createMeasurement: async (memberId, measurementData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/members/${memberId}/measurements`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${getStore().userToken}`,
						},
						body: JSON.stringify(measurementData),
					});
					const data = await response.json();
					if (response.ok) {
						setStore({ message: "Measurement created successfully" });
						return true;
					} else {
						setStore({ message: data.message });
						return false;
					}
				} catch (error) {
					console.error("Error creating measurement:", error);
					setStore({ message: "Error creating measurement" });
					return false;
				}
			},

			// Function to create new graphics for a member
			createGraphics: async (memberId, graphicsData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/members/${memberId}/graphics`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${getStore().userToken}`,
						},
						body: JSON.stringify(graphicsData),
					});
					const data = await response.json();
					if (response.ok) {
						setStore({ message: "Graphics created successfully" });
						return true;
					} else {
						setStore({ message: data.message });
						return false;
					}
				} catch (error) {
					console.error("Error creating graphics:", error);
					setStore({ message: "Error creating graphics" });
					return false;
				}
			},

			// Function to update measurements
			updateMeasurement: (id, measurementData) => {
				setStore({
					measurements: getStore().measurements.map(measurement => measurement.id === id ? { ...measurement, ...measurementData } : measurement)
				});
			},

			// Function to update graphics
			updateGraphics: (id, graphicsData) => {
				setStore({
					graphics: getStore().graphics.map(graphic => graphic.id === id ? { ...graphic, ...graphicsData } : graphic)
				});
			},
			 // Additional actions as needed

		},	
	};
};

		

export default getState;
