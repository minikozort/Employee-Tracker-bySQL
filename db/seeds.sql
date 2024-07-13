-- Insert seed data for departments
INSERT INTO department (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

-- Insert seed data for roles
INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 150000.00, 1), 
('Salesperson', 85000.00, 1), 
('Lead Engineer', 200000.00, 2), 
('Software Engineer', 120000.00, 2), 
('Account Manager', 160000.00, 3), 
('Accountant', 75000.00, 3), 
('Legal Team Lead', 250000.00, 4), 
('Lawyer', 210000.00, 4); 

-- Insert seed data for employees
-- Insert seed data for employees
INSERT INTO employee (first_name, last_name, role_id, is_manager, manager_id)
VALUES
('Jane', 'Foster', 1, true, 1),  -- Jane Foster is a Sales Lead (role_id = 1), manager_id = 1
('Thor', 'Odinson', 2, false, null),  -- Thor Odinson is a Salesperson (role_id = 2), not a manager
('Scarlet', 'Witch', 3, true, 3),  -- Scarlet Witch is a Lead Engineer (role_id = 3), manager_id = 3
('Vision', 'Sees', 4, false, null),  -- Vision Sees is a Software Engineer (role_id = 4), not a manager
('Natasha', 'Romanoff', 5, true, 5),  -- Natasha Romanoff is an Account Manager (role_id = 5), manager_id = 5
('Bruce', 'Banner', 6, false, null),  -- Bruce Banner is an Accountant (role_id = 6), not a manager
('Pepper', 'Pots', 7, true, 7),  -- Pepper Pots is a Legal Team Lead (role_id = 7), manager_id = 7
('Tony', 'Stark', 8, false, null);  -- Tony Stark is a Lawyer (role_id = 8), not a manager


