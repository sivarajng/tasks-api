DROP TABLE IF EXISTS public.task;
CREATE TABLE IF NOT EXISTS public.task (
    id SERIAL PRIMARY KEY,
    task VARCHAR(1000) NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'OPEN',
    created_on DATE NOT NULL DEFAULT now(),
    modified_on DATE NOT NULL DEFAULT now()
);
-- INSERT SAMPLE TASKS
INSERT INTO public.task (status,created_on,modified_on,task) VALUES
	 ('OPEN','2023-09-29','2023-09-29','Buy groceries'),
	 ('IN_PROGRESS','2023-09-29','2023-09-29','Pay the bills'),
	 ('IN_PROGRESS','2023-09-20','2023-09-29','Call mom'),
	 ('OPEN','2023-09-10','2023-09-10','Send an email to the boss'),
	 ('COMPLETED','2023-09-20','2023-09-29','Walk the dog'),
	 ('OPEN','2023-07-25','2023-07-25','Water the plants'),
	 ('OPEN','2023-09-29','2023-09-29','Clean the house'),
	 ('OPEN','2023-09-29','2023-09-29','Take out the trash'),
	 ('COMPLETED','2023-09-10','2023-09-10','Schedule a doctor appointment'),
	 ('OPEN','2023-09-29','2023-09-29','Attend a meeting at work'),
	 ('IN_PROGRESS','2023-09-20','2023-09-29','Cook dinner'),
	 ('OPEN','2023-09-29','2023-09-29','Read a book'),
	 ('IN_PROGRESS','2023-08-10','2023-08-15','Exercise for 30 minutes'),
	 ('IN_PROGRESS','2023-08-15','2023-08-15','Write in your journal'),
	 ('OPEN','2023-08-15','2023-08-15','Study for an upcoming exam'),
	 ('COMPLETED','2023-08-15','2023-08-15','Do laundry'),
	 ('COMPLETED','2023-08-10','2023-08-15','Plan a weekend getaway'),
	 ('OPEN','2023-07-25','2023-07-25','Organize the closet'),
	 ('OPEN','2023-07-25','2023-07-25','Check the mailbox'),
	 ('COMPLETED','2023-07-25','2023-07-25','Watch a documentary');

	
