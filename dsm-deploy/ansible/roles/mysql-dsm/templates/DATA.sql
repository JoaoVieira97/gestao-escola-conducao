USE dsm;

# DO NOT SET THIS
# SET time_zone = '+00:00';

# ------------------------------------------------------------------------------------------------------------------------------------------------
# SCHOOL DATA
# ------------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO SchoolInfo
    (ID, MaxTimeToCancel, StartTime, EndTime)
VALUES
    (1, '24:00:00', '08:00:00', '18:00:00');

INSERT INTO Category
    (ID, PracticalLessons, TheoreticalLessons, Name, Price)
VALUES
    (1, 32, 28, 'A1', 900),
    (2, 32, 28, 'A2', 900),
    (3, 32, 28, 'A', 900),
    (4, 32, 28, 'AM', 900),
    (5, 32, 28, 'B1', 900),
    (6, 32, 28, 'B', 900),
    (7, 32, 28, 'C1', 900),
    (8, 32, 28, 'C', 900),
    (9, 32, 28, 'D1', 900),
    (10, 32, 28, 'D', 900),
    (11, 32, 28, 'BE', 900),
    (12, 32, 28, 'C1E', 900),
    (13, 32, 28, 'CE', 900),
    (14, 32, 28, 'D1E', 900),
    (15, 32, 28, 'DE', 900);

INSERT INTO Theme
    (ID, Name)
VALUES
    (1, 'Velocidades'),
    (2, 'Cedência de Passagem'),
    (3, 'Via Pública'),
    (4, 'Manobras'),
    (5, 'Contraordenações'),
    (6, 'Categorias de Veículos'),
    (7, 'Reação, Travagem e Paragem'),
    (8, 'Circulação em Rotundas'),
    (9, 'Luzes'),
    (10, 'Sinais Sonoros'),
    (11, 'Segurança Ativa e Passiva'),
    (12, 'Classificação de Veículos'),
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
INSERT INTO User
    (ID, Name, Email, Password, Role)
VALUES
    (1, 'Hugo Oliveira', 'hugo@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_STUDENT'),
    (2, 'Raphael Oliveira', 'raphael@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_STUDENT'),
    (3, 'João Vieira', 'joao@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_STUDENT'),
    (4, 'Instrutor 1', 'instrutor_1@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_INSTRUCTOR'),
    (5, 'Instrutor 2', 'instrutor_2@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_INSTRUCTOR'),
    (6, 'Secretary 1', 'secretary_1@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_SECRETARY'),
    (7, 'Secretary 2', 'secretary_2@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_SECRETARY'),
    (8, 'Aluno 1', 'aluno1@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_STUDENT'),
    (9, 'Aluno 2', 'aluno2@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_STUDENT'),
    (10, 'Aluno 3', 'aluno3@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_STUDENT'),
    (11, 'Aluno 4', 'aluno4@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_STUDENT'),
    (12, 'Aluno 5', 'aluno5@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_STUDENT'),
    (13, 'Aluno 6', 'aluno6@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_STUDENT'),
    (14, 'Aluno 7', 'aluno7@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_STUDENT'),
    (15, 'Aluno 8', 'aluno8@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_STUDENT'),
    (16, 'Aluno 9', 'aluno9@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_STUDENT'),
    (17, 'Instrutor 3', 'instrutor_3@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_INSTRUCTOR'),
    (18, 'Instrutor 4', 'instrutor_4@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ROLE_INSTRUCTOR');

INSERT INTO Student
    (Nif, Cc, Address, Birth, UserID)
VALUES
    (111111111, '111111111111', 'Braga, Póvoa de Lanhoso', '1997-04-04', 1),
    (222222222, '222222222222', 'Braga', '1997-08-13', 2),
    (333333333, '333333333333', 'Braga', '1997-05-03', 3),
    (444444444, '444444444333', 'Braga', '1996-05-07', 8),
    (555555555, '555555555333', 'Braga', '1997-05-03', 9),
    (666666666, '666666666333', 'Braga', '1999-06-03', 10),
    (777777777, '777777777333', 'Braga', '1997-05-23', 11),
    (888888888, '888888888333', 'Braga', '1999-07-04', 12),
    (999999999, '999999999333', 'Braga', '1998-01-03', 13),
    (100000000, '100000000333', 'Braga', '1997-10-23', 14),
    (110000000, '110000000333', 'Braga', '1999-05-03', 15),
    (120000000, '120000000333', 'Braga', '1997-11-13', 16);

INSERT INTO Instructor
    (UserID)
VALUES
    (4),
    (5),
    (17),
    (18);

INSERT INTO Secretary
    (UserID)
VALUES
    (6),
    (7);

INSERT INTO Register
    (ID, InstructorUserID, CategoryID, StudentUserID, InitialDate)
VALUES
    (1, 4, 6, 1, '2019-01-01'),
    (2, 4, 6, 2, '2019-01-01'),
    (3, 5, 6, 3, '2019-01-01'),
    (4, 5, 3, 8, '2019-01-01'),
    (5, 5, 6, 9, '2018-04-02'),
    (6, 4, 6, 10, '2019-05-13'),
    (7, 5, 6, 11, '2019-05-14'),
    (8, 4, 6, 12, '2019-05-14'),
    (9, 4, 3, 13, '2019-05-15'),
    (10, 4, 6, 14, '2019-05-15'),
    (11, 4, 3, 15, '2019-06-16'),
    (12, 4, 3, 16, '2019-06-16');

INSERT INTO Payment
    (ID, RegisterID, SecretaryUserID, Value, Timestamp, Description)
VALUES
    (1, 1, 6, 100.0, '2019-01-01', 'Inscrição'),
    (2, 1, 6, 120.0, '2019-01-01', 'Primeira prestação'),
    (3, 4, 6, 100.0, '2019-01-01', 'Inscrição');

# ------------------------------------------------------------------------------------------------------------------------------------------------
# STUDENTS PERSONAL ANNOUNCEMENTS AND GENERAL ANNOUNCEMENTS
# ------------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO Announcement
    (ID, Title, Description, Timestamp)
VALUES
    (1, 'Escola fechada', 'A escola encontra-se encerrada no próximo dia 1 de Julho.', "2019-06-02 15:00:00"),
    (2, 'Escola fechada', 'A escola encontra-se encerrada no próximo dia 2 de Julho.', "2019-06-03 16:00:00"),
    (3, 'Aula cancelada', 'A sua aula do dia 15/07/2019 foi cancelada.', "2019-06-04 15:30:00"),
    (4, 'Aula cancelada', 'A sua aula do dia 16/07/2019 foi cancelada.', "2019-06-05 16:00:00"),
    (5, 'Aula cancelada', 'A sua aula do dia 17/07/2019 foi cancelada.', "2019-06-06 17:45:00"),
    (6, 'Aula teórica', 'A aula teórica das 10h do dia 25 de Junho foi cancelada.', "2019-06-07 11:10:00"),
    (7, 'Aula teórica', 'A aula teórica de amanhã realiza-se excepcionalmente às 11h00.', "2019-06-08 15:30:00"),
    (8, 'Exame teórico', 'O seu exame teórico está marcado para o dia 1 de Julho pelas 14h30.', "2019-06-09 15:40:00"),
    (9, 'Exame teórico', 'O seu exame teórico está marcado para o dia 2 de Julho pelas 15h30.', "2019-06-10 17:00:00"),
    (10, 'Exame teórico', 'O seu exame teórico está marcado para o dia 3 de Julho pelas 16h30.', "2019-06-11 18:00:00"),
    (11, 'Anúncio geral 1', 'Descrição de teste', "2019-06-01 17:45:00"),
    (12, 'Anúncio geral 2', 'Descrição de teste', "2019-06-07 10:35:00"),
    (13, 'Anúncio geral 3', 'Descrição de teste', "2019-06-17 12:30:00"),
    (14, 'Anúncio geral 4', 'Descrição de teste', "2019-06-03 18:05:00"),
    (15, 'Anúncio geral 5', 'Descrição de teste', "2019-06-05 20:45:00"),
    (16, 'Anúncio geral 6', 'Descrição de teste', "2019-06-01 11:10:00"),
    (17, 'Anúncio geral 7', 'Descrição de teste', "2019-06-06 11:45:00");

INSERT INTO PersonalAnnouncement
    (AnnouncementID, StudentUserID, Viewed)
VALUES
    (3, 1, false),
    (4, 2, false),
    (5, 3, false),
    (8, 1, false),
    (9, 2, false),
    (10, 3, false);

# ------------------------------------------------------------------------------------------------------------------------------------------------
# STUDENTS NEXT EVENTS DATA (PRACTICAL CLASSES AND EXAMS)
# ------------------------------------------------------------------------------------------------------------------------------------------------
# considering that Lesson state can be 'reserved', 'realized', 'canceled', 'opened'
INSERT INTO Lesson
    (ID, InstructorUserID, StartTime, Duration, State)
VALUES
    (1, 4, "2019-07-04 11:00:00", 60, 'reserved'), # P hugo
	(2, 4, "2019-07-03 13:00:00", 60, 'reserved'), # P raphael
	(3, 4, "2019-07-06 11:00:00", 60, 'reserved'), # P joao
	(4, 4, "2019-07-08 11:00:00", 60, 'reserved'), # P joao
	(5, 4, '2019-06-20 17:00:00', 60, 'realized'), # P hugo - concluida - presente
	(6, 4, '2019-06-21 17:00:00', 60, 'realized'), # P hugo - concluida - falta
	(7, 4, '2019-06-22 10:00:00', 60, 'realized'), # T hugo - concluida
	(8, 5, '2019-06-05 17:00:00', 60, 'realized'), # P hugo - concluida - presente
	(9, 5, '2019-06-10 10:00:00', 60, 'realized'), # T raphael - concluida
	(10, 4, '2019-08-28 10:00:00', 60, 'opened'), # T em aberto
	(11, 4, '2019-08-29 09:00:00', 60, 'opened'), # T em aberto
	(12, 4, '2019-08-30 10:00:00', 60, 'opened'), # T em aberto
	(13, 4, '2019-09-01 09:00:00', 60, 'opened'); # T em aberto

INSERT INTO Student_Lesson
    (StudentUserID, LessonID)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (3, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (1, 8),
    (2, 9),
    (1,10),
    (1,11),
    (1,12),
    (1,13),
    (2,10),
    (2,11),
    (2,12),
    (2,13),
    (3,10),
    (3,11),
    (3,12),
    (3,13);

INSERT INTO PracticalLesson
    (IsStudentPresent, LessonID)
VALUES
    (false, 1),
    (false, 2),
    (false, 3),
    (false, 4),
    (true, 5),
    (false, 6),
    (true, 8);

INSERT INTO TheoreticalLesson
    (LessonID)
VALUES
    (7),
    (9),
    (10),
    (11),
    (12),
    (13);

INSERT INTO Theme_TheoreticalLesson
    (ThemeID, TheoreticalLessonLessonID)
VALUES
    (1, 7),
    (2, 7),
    (3, 7),
    (4, 7),
    (5, 9),
    (6, 9),
    (7, 9),
    (8, 10),
    (4, 10),
    (2, 10),
    (6, 10),
    (1, 11),
    (32, 11),
    (15, 11),
    (7, 11),
    (13, 12),
    (12, 12),
    (15, 12),
    (18, 12),
    (17, 13),
    (13, 13),
    (24, 13),
    (28, 13);

INSERT INTO Lesson_Category
    (LessonID, CategoryID)
VALUES
    (1, 6),
    (2, 6),
    (3, 6),
    (4, 3),
    (5, 6),
    (6, 6),
    (7, 6),
    (8, 6),
    (9, 6),
    (10, 3),
    (11, 3),
    (12, 3),
    (13, 3),
    (10, 6),
    (11, 6),
    (12, 6),
    (13, 6);

INSERT INTO Exam
    (ID, StudentUserID, StartTime, Description)
VALUES
    (1, 1, "2019-08-01 14:30:00", 'Exame Teórico - Categoria B'),
    (2, 2, "2019-08-02 15:30:00", 'Exame Teórico - Categoria B'),
    (3, 3, "2019-07-03 16:30:00", 'Exame Teórico - Categoria B'),
    (4, 3, "2019-08-20 11:00:00", 'Exame Prático - Categoria B');

# ------------------------------------------------------------------------------------------------------------------------------------------------
# INSTRUCTOR DATA
# ------------------------------------------------------------------------------------------------------------------------------------------------
INSERT INTO WorkingDay
    (ID, Name)
VALUES
    (1, 'Domingo'),
    (2, 'Segunda'),
    (3, 'Terça'),
    (4, 'Quarta'),
    (5, 'Quinta'),
    (6, 'Sexta'),
    (7, 'Sábado');


INSERT INTO Instructor_WorkingDay
    (InstructorUserID, WorkingDayID)
VALUES
    (4, 2),
    (4, 4),
    (4, 6),
    (5, 3),
    (5, 5),
    (5, 7);          