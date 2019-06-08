USE dsm;

# ------------------------------------------------------------------------------------------------------------------------------------------------
# SCHOOL DATA
# ------------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO SchoolInfo (ID, MaxTimeToCancel, StartTime, EndTime)
	VALUES (1, '00:05:00','08:00:00','18:00:00');

INSERT INTO LicenseCar (ID, PracticalLessons, TheoreticalLessons, Name)
	VALUES 	(1, 32, 28, 'A1'),(2, 32, 28, 'A2'),(3, 32, 28, 'A'),(4, 32, 28, 'AM'),
            (5, 32, 28, 'B1'),(6, 32, 28, 'B'),
			(7, 32, 28, 'C1'),(8, 32, 28, 'C'),
            (9, 32, 28, 'D1'),(10, 32, 28, 'D'),
            (11, 32, 28, 'BE'),
            (12, 32, 28, 'C1E'),
            (13, 32, 28, 'CE'),
            (14, 32, 28, 'D1E'),
            (15, 32, 28, 'DE');

INSERT INTO Theme (ID, Name)
	VALUES 	(1, 'Velocidades'),(2, 'Cedência de Passagem'),
            (3, 'Via Pública'),(4, 'Manobras'),
            (5, 'Contraordenações'),(6, 'Categorias de Veículos'),
            (7, 'Reação, Travagem e Paragem'),(8, 'Circulação em Rotundas'),
            (9, 'Luzes'),(10, 'Sinais Sonoros'),
            (11, 'Segurança Ativa e Passiva'),(12, 'Classificação de Veículos'),
            (13, 'Sinais de Trânsito - Hierarquia da Sinalização'),
            (14, 'Sinais de Trânsito - Agentes da Autoriadade'),
            (15, 'Sinais de Trânsito - Sinalização Temporária'),
            (16, 'Sinais de Trânsito - Mensagem Variável'),
            (17, 'Sinais de Trânsito - Sinalização Luminosa'),
            (18, 'Sinais de Trânsito - Perigo'),
            (19, 'Sinais de Trânsito - Cedência de Passagem'),
            (20, 'Sinais de Trânsito - Proibição'),
            (21, 'Sinais de Trânsito - Obrigação'),
            (22, 'Sinais de Trânsito - Prescrição Específica'),
            (23, 'Sinais de Trânsito - Informação'),
            (24, 'Sinais de Trânsito - Pré-sinalização'),
            (25, 'Sinais de Trânsito - Direção'),
            (26, 'Sinais de Trânsito - Confirmação'),
            (27, 'Sinais de Trânsito - Localidades'),
            (28, 'Sinais de Trânsito - Turístico-cultural'),
            (29, 'Sinais de Trânsito - Complementares'),
            (30, 'Sinais de Trânsito - Marcas Rodoviárias'),
            (31, 'Sinais de Trânsito - Painés Adicionais'),
            (32, 'Outras Informações');


    
# ------------------------------------------------------------------------------------------------------------------------------------------------
# USERS DATA
# ------------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO User (ID, FirstName, LastName, Email, Password, Role)
	VALUES 	(1, 'Hugo', 'Oliveira', 'hugo@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_STUDENT'),
			(2, 'Raphael', 'Oliveira', 'raphael@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_STUDENT'),
            (3, 'João', 'Vieira', 'joao@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_STUDENT'),
            (4, 'Instrutor', '1', 'instrutor_1@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_INSTRUCTOR'),
            (5, 'Instrutor', '2', 'instrutor_2@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_INSTRUCTOR'),
            (6, 'Secretary', '1', 'secretary_1@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_SECRETARY'),
            (7, 'Secretary', '2', 'secretary_2@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_SECRETARY');
                        
INSERT INTO Student (Nif, Cc, Address, Birth, UserID)
	VALUES 	(111111111, '111111111111', 'Braga, Póvoa de Lanhoso', '1997-04-04', 1),
			(222222222, '222222222222', 'Braga', '1997-08-13', 2),
            (333333333, '333333333333', 'Braga', '1997-05-03', 3);
            
INSERT INTO Instructor (UserID)
	VALUES 	(4), (5);

INSERT INTO Secretary (UserID)
	VALUES 	(6), (7);

INSERT INTO Register (ID, InstructorUserID, LicenseCarID, StudentUserID, InitialDate)
	VALUES 	(1, 4, 6, 1, CURDATE()), 
			(2, 4, 6, 2, CURDATE()),
            (3, 5, 6, 3, CURDATE());







