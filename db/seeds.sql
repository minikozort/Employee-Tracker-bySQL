-- Department seeds
INSERT INTO department (id, name)
VALUES
(1, 'Sales'),
(2, 'Engineering'),
(3, 'Finance'),
(4, 'Legal');

-- Employee role seeds
INSERT INTO role (id, title, salary, department_id)
VALUES
(1, 'Sales Lead', 150000, 1), 
(2, 'Salesperson', 85000, 1), 
(3, 'Lead Engineer', 200000, 2), 
(4, 'Software Engineer', 120000, 2), 
(5, 'Account Manager', 160000, 3), 
(6, 'Accountant', 75000, 3), 
(7, 'Legal Team Lead', 250000, 4), 
(8, 'Lawyer', 210000, 4); 

-- Employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jane', 'Foster', 1, 1), 
('Thor', 'Odinson', 2, null),
('Scarlet', 'Witch', 3, 3),
('Vision', 'Sees', 4, null),
('Bruce', 'Banner', 5, 5),
('Natasha', 'Romanoff', 6, null),
('Tony', 'Stark', 7, 7),
('Pepper', 'Pots', 8, null);