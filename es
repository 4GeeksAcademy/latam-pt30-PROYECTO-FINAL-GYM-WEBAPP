                                        Table "public.exercises"
     Column      |         Type          | Collation | Nullable |                Default                
-----------------+-----------------------+-----------+----------+---------------------------------------
 id              | integer               |           | not null | nextval('exercises_id_seq'::regclass)
 name            | character varying(50) |           | not null | 
 Link_video      | character varying(50) |           |          | 
 muscle_group_id | integer               |           |          | 
Indexes:
    "exercises_pkey" PRIMARY KEY, btree (id)
    "exercises_name_key" UNIQUE CONSTRAINT, btree (name)
Foreign-key constraints:
    "exercises_muscle_group_id_fkey" FOREIGN KEY (muscle_group_id) REFERENCES muscle_group(id)
Referenced by:
    TABLE "workout_plan" CONSTRAINT "workout_plan_exercise_id_fkey" FOREIGN KEY (exercise_id) REFERENCES exercises(id)

