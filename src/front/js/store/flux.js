
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Authentication data
			message: null, // Mensaje de éxito o error
			isAuthenticated: false, // Estado de autenticación del usuario
			userToken: null, // Token JWT
			user: {}, // Información del usuario 
			memberProfileImage:"",

			//MEMBERS
			members: [
				{
					id: "1",
					name: 'John',
					last_name: 'Doe',
					gender: 'male',
					height: '180 cm',
					weight: '75 kg',
					birthday: '1990-01-01',
					city: 'New York',
					country: 'USA',
				},
				{
					id: "2",
					name: 'Jane',
					last_name: 'Smith',
					gender: 'female',
					height: '165 cm',
					weight: '60 kg',
					birthday: '1985-05-15',
					city: 'Los Angeles',
					country: 'USA',
				},
			],
			member: {},

			//WORKOUTS
			workouts: [
				{
					id: "1",
					name: 'Body Recomposition "Begginers" ',
					days: [
						{
							day: {id: "1", name:"Monday"},
							muscle_group: [
								{ id: "3", name: "Quads" },
								{ id: "10", name: "Glutes" },
								{id: "14", name: "Calf"}

							],
							sets: [
								{
								  set_id: "A",
								  set_type: "SuperSet", // Tipo de conjunto o TriSet
								  exercises: [
									{ id: "1", name: "Free Squats", reps: "30, 20, 15, 12, 10, 8, 6", rounds: 7, rest_time: "60", description: ""},
									{ id: "2", name: "Sissy Squats", reps: "30, 20, 15, 12, 10, 8, 6", rounds: 7, rest_time: "60", description: ""},
								  ]
								},
								{
								  set_id: "B",
								  set_type: "SuperSet",
								  exercises: [
									{ id: "3", name: "Dispositions in Smith", reps: "15, 12, 10, 8", rounds: 4, rest_time: "60", description: "Increment weight"},
									{ id: "4", name: "Closing abductor", reps: 10, rounds: 3, rest_time: "60", description: "Heavy"}
								  ]
								},
								{
									set_id: "C",
									set_type: "TriSet",
									exercises: [
										{ id: "5", name: "Barbell deadlift", reps: 20, rounds: 4, rest_time: "60", description: ""},
										{ id: "6", name: "Femoral lying", reps: 25, rounds: 4, rest_time: "60", description: "Incrementar weight"},
										{ id: "7", name: "Press", reps: 50, rounds: 4, rest_time: "60", description: ""}
									]
								  },
								  {
									set_id: "D",
									set_type: "SuperSet",
									exercises: [
										{ id: "8", name: "Sitting calf", reps: 30, rounds: 4, rest_time: "60", description: ""},
										{ id: "9", name: "Standing calf", reps: 30, rounds: 4, rest_time: "60", description: ""}
									]
								  },

							  ],
						},
						{
							day: {id: "2", name:"Tuesday"},
							muscle_group: [
								{ id: "1", name: "Chest" },
								{ id: "7", name: "Shoulders" },
								{ id: "5", name: "Triceps" }
							],
							sets: [
								{
								  set_id: "E",
								  set_type: "SuperSet", // Tipo de conjunto
								  exercises: [
									{ id: "10", name: "Incline chest press", reps: 10, rounds: 4, rest_time: "60", description: ""},
									{ id: "11", name: "Christs", reps: 15, rounds: 4, rest_time: "60", description: ""},
								  ]
								},
								{
								  set_id: "F",
								  set_type: "SuperSet",
								  exercises: [
									{ id: "12", name: "Dumbbell flat press", reps: 10, rounds: 4, rest_time: "60", description: ""},
									{ id: "13", name: "Chest cables down", reps: 10, rounds: 4, rest_time: "60", description: ""},
								  ]
								},
								{
									set_id: "G",
									set_type: "SuperSet",
									exercises: [
										{ id: "14", name: "Military press with dumbbell", reps: 10, rounds: 4, rest_time: "60", description: "Increment weight"},
										{ id: "15", name: "Birds", reps: 8, rounds: 4, rest_time: "20s", description: ""}
									]
								  },
								  {
									set_id: "H",
									set_type: "SuperSet",
									exercises: [
										{ id: "16", name: "Dumbbell front", reps: 15, rounds: 4, rest_time: "60", description: "" },
										{ id: "17", name: "Inverted peckfly", reps: 15, rounds: 4, rest_time: "60", description: "" }
									]
								  },
								  {
									set_id: "I",
									set_type: "TriSet",
									exercises: [
										{ id: "18", name: "French press with bar", reps: 10, rounds: 4, rest_time: "60", description: "" },
										{ id: "19", name: "Cup", reps: 10, rounds: 4, rest_time: "60", description: "" },
										{ id: "20", name: "Triceps pulley with straight bar", reps: 15, rounds: 4, rest_time: "60", description: "" }
									]
								  },
							  ],
						},
						{
							day: {id: "3", name:"Wednesday"},
							muscle_group: [
								{ id: "3", name: "Quads" },
								{ id: "10", name: "Glutes" },
								{id: "14", name: "Calf"}
							],
							sets: [
								{
								  set_id: "A",
								  set_type: "SuperSet", // Tipo de conjunto o TriSet
								  exercises: [
									{ id: "1", name: "Free Squats", reps: "30, 20, 15, 12, 10, 8, 6", rounds: 7, rest_time: "60", description: ""},
									{ id: "2", name: "Sissy Squats", reps: "30, 20, 15, 12, 10, 8, 6", rounds: 7, rest_time: "60", description: ""},
								  ]
								},
								{
								  set_id: "B",
								  set_type: "SuperSet",
								  exercises: [
									{ id: "3", name: "Dispositions in Smith", reps: "15, 12, 10, 8", rounds: 4, rest_time: "60", description: "Increment weight"},
									{ id: "4", name: "Closing abductor", reps: 10, rounds: 3, rest_time: "60", description: "Heavy"}
								  ]
								},
								{
									set_id: "C",
									set_type: "TriSet",
									exercises: [
										{ id: "5", name: "Barbell deadlift", reps: 20, rounds: 4, rest_time: "60", description: ""},
										{ id: "6", name: "Femoral lying", reps: 25, rounds: 4, rest_time: "60", description: "Incrementar weight"},
										{ id: "7", name: "Press", reps: 50, rounds: 4, rest_time: "60", description: ""}
									]
								  },
								  {
									set_id: "D",
									set_type: "SuperSet",
									exercises: [
										{ id: "8", name: "Sitting calf", reps: 30, rounds: 4, rest_time: "60", description: ""},
										{ id: "9", name: "Standing calf", reps: 30, rounds: 4, rest_time: "60", description: ""}
									]
								  },

							  ],
						},
						{
							day: {id: "4", name:"Thursday"},
							muscle_group: [
								{ id: "2", name: "Back" },
								{ id: "5", name: "Triceps" }
							],
							sets: [
								{
								  set_id: "J",
								  set_type: "Set", // Tipo de conjunto
								  exercises: [
									{ id: "21", name: "Pull-ups", reps: "Fail", rounds: 6, rest_time: "60", description: ""}
								  ]
								},
								{
									set_id: "K",
									set_type: "SuperSet", // Tipo de conjunto
									exercises: [
										{ id: "22", name: "Barbell front pull", reps: 10, rounds: 4, rest_time: "60", description: ""},
										{ id: "23", name: "Straight bar row", reps: 10, rounds: 4, rest_time: "60", description: ""}
									]
								  },
								  {
									set_id: "L",
									set_type: "SuperSet", // Tipo de conjunto
									exercises: [
										{ id: "24", name: "Seated row", reps: 10, rounds: 4, rest_time: "60", description: ""},
										{ id: "25", name: "Dumbbell row", reps: 10, rounds: 4, rest_time: "60", description: ""}
									]
								  },
								  {
									set_id: "M",
									set_type: "SuperSet", // Tipo de conjunto
									exercises: [
										{ id: "26", name: "Barbell curl", reps: 15, rounds: 4, rest_time: "60", description: "Incrementar weight"},
										{ id: "27", name: "Curl on biceps machine", reps: 20, rounds: 4, rest_time: "60", description: "Down in 5 seconds"}
									]
								  },
								  {
									set_id: "M",
									set_type: "TriSet", // Tipo de conjunto
									exercises: [
										{ id: "28", name: "Hammer curl", reps: 30, rounds: 4, rest_time: "60", description: ""},
										{ id: "29", name: "Inverted curl with z bar", reps: 15, rounds: 4, rest_time: "60", description: "Open grip"},
										{ id: "30", name: "Triceps pulley with straight bar", reps: 15, rounds: 4, rest_time: "60", description: "" }
									]
								  },
							  ],
						},
						{
							day: {id: "2", name:"Friday"},
							muscle_group: [
								{ id: "1", name: "Chest" },
								{ id: "7", name: "Shoulders" },
								{ id: "5", name: "Triceps" }
							],
							sets: [
								{
								  set_id: "E",
								  set_type: "SuperSet", // Tipo de conjunto
								  exercises: [
									{ id: "10", name: "Incline chest press", reps: 10, rounds: 4, rest_time: "60", description: ""},
									{ id: "11", name: "Christs", reps: 15, rounds: 4, rest_time: "60", description: ""},
								  ]
								},
								{
								  set_id: "F",
								  set_type: "SuperSet",
								  exercises: [
									{ id: "12", name: "Dumbbell flat press", reps: 10, rounds: 4, rest_time: "60", description: ""},
									{ id: "13", name: "Chest cables down", reps: 10, rounds: 4, rest_time: "60", description: ""},
								  ]
								},
								{
									set_id: "G",
									set_type: "SuperSet",
									exercises: [
										{ id: "14", name: "Military press with dumbbell", reps: 10, rounds: 4, rest_time: "60", description: "Increment weight"},
										{ id: "15", name: "Birds", reps: 8, rounds: 4, rest_time: "20s", description: ""}
									]
								  },
								  {
									set_id: "H",
									set_type: "SuperSet",
									exercises: [
										{ id: "16", name: "Dumbbell front", reps: 15, rounds: 4, rest_time: "60", description: "" },
										{ id: "17", name: "Inverted peckfly", reps: 15, rounds: 4, rest_time: "60", description: "" }
									]
								  },
								  {
									set_id: "I",
									set_type: "TriSet",
									exercises: [
										{ id: "18", name: "French press with bar", reps: 10, rounds: 4, rest_time: "60", description: "" },
										{ id: "19", name: "Cup", reps: 10, rounds: 4, rest_time: "60", description: "" },
										{ id: "20", name: "Triceps pulley with straight bar", reps: 15, rounds: 4, rest_time: "60", description: "" }
									]
								  },
							  ],
						},
					],
				}
				// {
				// 	id: "2",
				// 	name: "Plan 2",
				// 	days: [
				// 		{
				// 			day: {id: "5", name:"Day 1"},
				// 			muscle_group: [
				// 				{ id: "3", name: "Quads" },
				// 				{ id: "6", name: "Forearms" }
				// 			],
				// 			exercises: [
				// 				{ id: "20", name: "Incline chest press", reps: 10, sets: 4, rest_time: "60", description: "", super_set:"" },
				// 				{ id: "21", name: "Christs", reps: 15, sets: 4, rest_time: "60", description: "", super_set:"" },
				// 				{ id: "22", name: "Dumbbell flat press", reps: 10, sets: 4, rest_time: "60", description: "", super_set:"" },
				// 				{ id: "23", name: "Military press with dumbbell", reps: 10, sets: 4, rest_time: "60", description: "Increment weight", super_set:"" },
				// 				{ id: "24", name: "Birds", reps: 8, sets: 4, rest_time: "20s", description: "", super_set:"" },
				// 				{ id: "25", name: "dumbbell front", reps: 15, sets: 4, rest_time: "60", description: "", super_set:""  },
				// 				{ id: "26", name: "Inverted peckfly", reps: 15, sets: 4, rest_time: "60", description: "", super_set:""  },
				// 				{ id: "27", name: "French press with bar", reps: 10, sets: 4, rest_time: "60", description: "", super_set:""  },
				// 				{ id: "28", name: "Cup", reps: 10, sets: 4, rest_time: "60", description: "", super_set:""  },
								
								
				// 			],
				// 		},
				// 		{
				// 			day: {id: "6", name:"Day 2"},
				// 			muscle_group: [
				// 				{ name: "abs" },
				// 				{ name: "shoulders" }
				// 			],
				// 			exercises: [
								
				// 				{ id: "20", name: "Peckfly", reps: 12, sets: 3, rest_time: "20s", description: "", super_set:""  },
				// 			],
				// 		},
				// 	],
				// },

			],
			muscle_groups: [
				{id: "1", name: "Chest"},
				{id: "2", name: "Back"},
				{id: "3", name: "Quads"},
				{id: "4", name: "Biceps"},
				{id: "5", name: "Triceps"},
				{id: "6", name: "Forearms"},
				{id: "7", name: "Shoulders"},
				{id: "8", name: "Trapeze"},
				{id: "9", name: "Hamstrings"},
				{id: "10", name: "Glutes"},
				{id: "11", name: "ABS"},
				{id: "12", name: "Forearm muscles"},
				{id: "13", name: "Neck muscles"},
				{id: "14", name: "Calf"},
			],

			//BODY MEASUREMENTS
			body_measurements: [
				{
					id: "1",
					date:"",
					height: "174",
					weight: "77",
					neck: "45",
					relaxed_arm: "35",
					flexed_arm: "37",
					waist: "80",
					calves: "32",
					chest: "96",
					hips: "105",
					thighs: "50",
					shoulders: "122"
				},
				{
					id: "2",
					date:"",
					height: "174",
					weight: "77",
					neck: "45",
					relaxed_arm: "35",
					flexed_arm: "37",
					waist: "80",
					calves: "32",
					chest: "96",
					hips: "105",
					thighs: "50",
					shoulders: "122"
				}
			],

			//OTHERS
			videos: [
				{id:"1", title:"Flat bench press", link:"https://www.youtube.com/embed/SidmT09GXz8", muscle_group:"1"},
				{id:"2", title:"Incline press", link:"https://www.youtube.com/embed/oZVCBM9f8Eo", muscle_group:"1"},
				{id:"3", title:"Cable Crossover Flat Bench Fly", link:"https://www.youtube.com/embed/-8aurlfuYk4", muscle_group:"1"},
				{id:"4", title:"Pulley crossover press", link:"https://www.youtube.com/embed/NyO5y-G5Ceg", muscle_group:"1"},
				{id:"5", title:"Z Bar French Press", link:"https://www.youtube.com/embed/ANd7uB6wCVw", muscle_group:"5"},
				{id:"6", title:"Close Grip Bench Press", link:"https://www.youtube.com/embed/43rg7fBNP2w", muscle_group:"5"},
				{id:"7", title:"Parallel Bars Dips", link:"https://www.youtube.com/embed/QGoS22SITEM", muscle_group:"5"},
				{id:"8", title:"Barbell bent over row", link:"https://www.youtube.com/embed/vnGSs0qnD8Q", muscle_group:"2"},
				{id:"9", title:"Row gironda", link:"https://www.youtube.com/embed/GBXQBhuCT3U", muscle_group:"2"},
				{id:"10", title:"Chest pull", link:"https://www.youtube.com/embed/Jz7oEmzhnfE", muscle_group:"2"},
				{id:"11", title:"Barbell row", link:"https://www.youtube.com/embed/Nqh7q3zDCoQ", muscle_group:"2"},
				{id:"12", title:"Gironde rowing", link:"https://www.youtube.com/embed/fPbfYDgzIgA", muscle_group:"2"},
				{id:"13", title:"T Bar Row", link:"https://www.youtube.com/embed/hYo72r8Ivso", muscle_group:"2"},
				{id:"14", title:"Rack pull", link:"https://www.youtube.com/embed/qknGn76BK80", muscle_group:"2"},
				{id:"15", title:"Dumbbell shrug", link:"https://www.youtube.com/embed/xDt6qbKgLkY", muscle_group:"2"},
				{id:"16", title:"Back Extension", link:"https://www.youtube.com/embed/Tb9yp81fI9s", muscle_group:"2"},
				{id:"17", title:"Pull-ups for biceps", link:"https://www.youtube.com/embed/Oi3bW9nQmGI", muscle_group:"4"},
				{id:"18", title:"Z bar curl scott bench", link:"https://www.youtube.com/embed/Gydpcouclx8", muscle_group:"4"},
				{id:"19", title:"Concentration Curl", link:"https://www.youtube.com/embed/cHxRJdSVIkA", muscle_group:"4"},
				{id:"20", title:"Abdominal Crunch", link:"https://www.youtube.com/embed/qXpYgvQ6_m4", muscle_group:"15"},
				{id:"21", title:"Hack Squat", link:"https://www.youtube.com/embed/bGbHOeHXnB8", muscle_group:"3"},
				{id:"22", title:"Squat", link:"https://www.youtube.com/embed/bGbHOeHXnB8", muscle_group:"3"},
				{id:"23", title:"Leg Press", link:"https://www.youtube.com/embed/ahaJTts1f3s", muscle_group:"9"},
				{id:"24", title:"Legs Extensions", link:"https://www.youtube.com/embed/PQRY75OY2TY", muscle_group:"3"},
				{id:"25", title:"Lunges", link:"https://www.youtube.com/embed/20wSs0bp2Gs", muscle_group:"9"},
				{id:"26", title:"Seated Calf Raise Machine", link:"https://www.youtube.com/embed/HSGjUouQZCQ", muscle_group:"14"},
				{id:"27", title:"Hip thrust", link:"https://www.youtube.com/embed/W86oVlnLqY4", muscle_group:"10"},
				{id:"28", title:"Military press", link:"https://www.youtube.com/embed/qLfQbDHWJvE", muscle_group:"1"},
				{id:"29", title:"Standing Shoulder Fly", link:"https://www.youtube.com/embed/asgla5Zg-co", muscle_group:"1"},
				{id:"30", title:"Lateral raises", link:"https://www.youtube.com/embed/XPPfnSEATJA", muscle_group:""},
				{id:"31", title:"Lateral abs", link:"https://www.youtube.com/embed/VwLXMuL_30Q", muscle_group:"15"},
				{id:"32", title:"Lower abs", link:"https://www.youtube.com/embed/QwXkV6AT_LA", muscle_group:"15"}
			],
			valExercises: []
		},

		actions: {
			//LOGIN , SIGN UP & LOG OUT FETCH ZONE ________________________________
			//SignUp.js
			postSignup: async (email, password) => {
				try {
					await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						body: JSON.stringify({ email, password }), // data can be `string` or {object}!
						headers: {
							"Content-Type": "application/json"
						},
					})
					return true
				} catch (error) {
					console.log(error);
					return false
				}
			},

			//Login.js
			postLogin: (email, password) => {
				console.log("Login credentials:", email, password)
				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify({ email, password }), // data can be `string` or {object}!
					headers: {
						"Content-Type": "application/json"
					}

				})
					.then(res => res.json())
					.then(data => {
						if (data.token) {
							localStorage.setItem("accessToken", data.token);
							localStorage.setItem("accessId", data.user.id);
							setStore({ user: data.user, userToken: data.token });
							console.log("VALOR DE LOCALSTORAGE *** ", localStorage.getItem('accessToken'));
						} else {
							alert("Invalid user or password")
							throw new Error('Invalid login response');
						}
					})
					.catch(error => console.error("Error:", error));

			},

			//image ukpload

			imageUpload: async (image) => {
				const body = new FormData()
				body.append("image", image)
				let response = await fetch(process.env.BACKEND_URL + "/api/image_upload", {
					method:"POST",
					body:body
				})
				console.log(response);
				
				const data = await response.json()
				console.log(data.secure_url);
				
				if (response.ok) {
					const imageUrl = data.secure_url;
					setStore({memberProfileImage: imageUrl})
					//console.log(data);
					return data
				}
				else {
					console.error("Error uploading image:", data);
					return null;
				}
			},

			//Get current User
			getCurrentUser: async () => {
				let response = await fetch(process.env.BACKEND_URL + "/api/current_user", {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("accessToken")
					}
				})
				let data = await response.json()
				if (response.ok) {
					setStore({ user: data })
				}
			},

			//Footer.js
			logOut: () => {
				setStore({ user: null });
			},

			//UPDATE USER
			updateUser: async (id, values) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/updateProfile/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${getStore().userToken}`, // Add token for authentication
						},
						body: JSON.stringify(values),
					});
					const data = await response.json();
					if (response.ok) {
						console.log("User updated successfully");
						return true;
					} else {
						console.error(data.message);
						return false;
					}
				} catch (error) {
					console.error("Error updating user:", error);
					return false;
				}
			},

			// Function to create a new user profile
			createUser: async (memberData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/createProfile/<int:user_id>`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${getStore().userToken}`, // Add token for authentication
						},
						body: JSON.stringify(memberData),
					});
					const data = await response.json();
					if (response.ok) {
						console.log("Member created successfully");
						return true;
					} else {
						console.error(data.message);
						return false;
					}
				} catch (error) {
					console.error("Error creating member:", error);
					return false;
				}
			},


			
			
			//EXERCISES FETCH ZONE________________________________________
			
			//GET MUSCLE GRUOPS
			//DayForm.js
			getMuscleGroups: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/muscle-groups`);
					const data = await response.json();
					setStore({ muscle_groups: data });
				} catch (error) {
					console.error("Error fetching muscle groups:", error);
				}
			},
			
			//GET WORKOUTS
			//POSSIBLEEEE Dashboard.js // NO SE ESTA USANDO EL TOKEN
			getWorkouts: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/workouts`);
					if (!response.ok) throw new Error("Failed to fetch workouts");
					const data = await response.json();
					setStore({ workouts: data });
				} catch (error) {
					console.error("Error fetching workouts:", error);
				}
			},
			
			//UPDATE WORKOUT
			//CreateEditPlan.jsx
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
					if (!response.ok) throw new Error("Failed to update workout");
					const data = await response.json();
					const store = getStore();
					const updatedWorkouts = store.workouts.map(workout => {
						// days: [1, 2, 3],          // Array de IDs de días
						// exercise_ids: [4, 5, 6],  // Array de IDs de ejercicios
						// name: "New Workout Name", // Nombre del plan de entrenamiento
						// description: "Updated workout description" // Descripción
						if (workout.id === id) {
							return { ...workout, ...data };
						}
						return workout;
						
					});
					setStore({ workouts: updatedWorkouts });
				} catch (error) {
					console.error("Error updating workout:", error);
				}
			},
			
			//CREATE WORKOUT
			//CreateEditPlan.jsx
			createWorkout: async (createWorkout) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/workouts`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${getStore().userToken}`
						},
						body: JSON.stringify(createWorkout),
					});
					if (!response.ok) throw new Error("Failed to add workout");
					const data = await response.json();
					const store = getStore();
					setStore({ workouts: [...store.workouts, data] });
				} catch (error) {
					console.error("Error creating workout:", error);
				}
			},
			
			//DELETE WORKOUT
			//POSSSIBLEEEE CreateEditPlan.jsx
			deleteWorkout: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/workouts/${id}`, {
						method: "DELETE",
					});
					if (!response.ok) throw new Error("Failed to delete workout");
					const store = getStore();
					const updatedWorkouts = store.workouts.filter(workout => workout.id !== id);
					setStore({ workouts: updatedWorkouts });
				} catch (error) {
					console.error("Error deleting workout:", error);
				}
			},
			
			
			//GET WORKOUT BY ID
			//POSSIBLEEEE Dashboard.js // NO SE ESTA USANDO EL TOKEN
			getWorkoutById: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/workouts/${id}`);
					const data = await response.json();
					setStore({ workouts: store.workouts.map(workout => workout.id === id ? data : workout) });
				} catch (error) {
					console.error("Error fetching workout by ID:", error);
				}
			},
			
			// **** Fin se adiciona Singup y login 16 de julio de 2024 9:22 a.m. Por GE
			//FETCHING EXERCISES FOR PRUEBA EXERCISES

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

			createSet: async (type, rest_time, day_id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/sets`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            type: type,
                            rest_time: rest_time,
                            day_id: day_id
                        })
                    });
                    if (response.ok) {
                        const newSet = await response.json();
                        const store = getStore();
                        setStore({ sets: [...store.sets, newSet] });
                        return newSet;
                    } else {
                        console.error("Error creating set", response.statusText);
                    }
                } catch (error) {
                    console.error("Error in createSet:", error);
                }
            },

            // Obtener Sets por Día
            getSetsByDay: async (day_id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/days/${day_id}/sets`, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (response.ok) {
                        const sets = await response.json();
                        setStore({ sets: sets });
                    } else {
                        console.error("Error fetching sets", response.statusText);
                    }
                } catch (error) {
                    console.error("Error in getSetsByDay:", error);
                }
            },

            // Actualizar Set
            updateSet: async (set_id, updatedData) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/sets/${set_id}`, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updatedData)
                    });
                    if (response.ok) {
                        const updatedSet = await response.json();
                        const store = getStore();
                        const updatedSets = store.sets.map(set => set.id === set_id ? updatedSet : set);
                        setStore({ sets: updatedSets });
                        return updatedSet;
                    } else {
                        console.error("Error updating set", response.statusText);
                    }
                } catch (error) {
                    console.error("Error in updateSet:", error);
                }
            },

            // Eliminar Set
            deleteSet: async (set_id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/sets/${set_id}`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (response.ok) {
                        const store = getStore();
                        const remainingSets = store.sets.filter(set => set.id !== set_id);
                        setStore({ sets: remainingSets });
                        return true;
                    } else {
                        console.error("Error deleting set", response.statusText);
                    }
                } catch (error) {
                    console.error("Error in deleteSet:", error);
                }
            },
        
			
			//MEMBERS FETCH ZONE_______________________________________________________
			//CREATE MEMBER
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

			// getAllMembers: async () => {
			// 	try {
			// 		const response = await fetch(`${process.env.BACKEND_URL}/api/members`, {
			// 			headers: {
			// 				"Authorization": `Bearer ${getStore().userToken}`, // Add token for authentication
			// 			}
			// 		});
			// 		const data = await response.json();
			// 		if (response.ok) {
			// 			setStore({ members: data });
			// 		} else {
			// 			console.error('Error fetching members:', data.message);
			// 		}
			// 	} catch (error) {
			// 		console.error("Error fetching members:", error);
			// 	}
			// },
			
			
			//MEASUREMENT FETCH ZONE_______________________________________________________
			
			//CREATE MEASUREMENT
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
						setStore({ body_measurements: data });
					} else {
						console.error('Error fetching measurements:', data.message);
					}
				} catch (error) {
					console.error("Error fetching measurements:", error);
				}
			},


			// Function to create a new measurement for a member
			createBodyMeasurement: async (memberId, measurementData) => {
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
						console.log("Measurement created successfully");
						return true;
					} else {
						console.error(data.message);
						return false;
					}
				} catch (error) {
					console.error("Error creating measurement:", error);
					return false;
				}
			},

			// Function to update measurements
			updateBodyMeasurement: async (id, measurementData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/measurements/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${getStore().userToken}`,
						},
						body: JSON.stringify(measurementData),
					});
					const data = await response.json();
					if (response.ok) {
						const updatedMeasurements = getStore().body_measurements.map(measurement =>
							measurement.id === id ? data : measurement
						);
						setStore({ body_measurements: updatedMeasurements });
						console.log("Measurement updated successfully");
						return true;
					} else {
						setStore({ message: data.message });
						return false;
					}
				} catch (error) {
					console.error("Error updating measurement:", error);
					return false;
				}
			},







			//GRAPHICS___________________________________________
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


			// Function to update graphics
			updateGraphics: (id, graphicsData) => {
				setStore({
					graphics: getStore().graphics.map(graphic => graphic.id === id ? { ...graphic, ...graphicsData } : graphic)
				});
			},
			// VIDEOS____________________________________
			getVideos: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/videos`);
					const data = await response.json();
					setStore({ videos: data });
				} catch (error) {
					console.error("Error fetching videos:", error);
				}
			},
			// Otras funciones aquí...
		},
	};
};



export default getState;
