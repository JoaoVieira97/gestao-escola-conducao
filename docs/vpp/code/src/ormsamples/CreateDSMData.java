/**
 * Licensee: Hugo Oliveira(Universidade do Minho)
 * License Type: Academic
 */
package ormsamples;

import org.orm.*;
public class CreateDSMData {
	public void createTestData() throws PersistentException {
		PersistentTransaction t = dsm.DSMPersistentManager.instance().getSession().beginTransaction();
		try {
			dsm.PracticalLesson ldsmPracticalLesson = dsm.PracticalLessonDAO.createPracticalLesson();
			// TODO Initialize the properties of the persistent object here, the following properties must be initialized before saving : isStudentPresent
			dsm.PracticalLessonDAO.save(ldsmPracticalLesson);
			dsm.WorkingDay ldsmWorkingDay = dsm.WorkingDayDAO.createWorkingDay();
			// Initialize the properties of the persistent object here
			dsm.WorkingDayDAO.save(ldsmWorkingDay);
			dsm.SchoolInfo ldsmSchoolInfo = dsm.SchoolInfoDAO.createSchoolInfo();
			// TODO Initialize the properties of the persistent object here, the following properties must be initialized before saving : endTime, startTime, maxTimeToCancel
			dsm.SchoolInfoDAO.save(ldsmSchoolInfo);
			dsm.Announcement ldsmAnnouncement = dsm.AnnouncementDAO.createAnnouncement();
			// Initialize the properties of the persistent object here
			dsm.AnnouncementDAO.save(ldsmAnnouncement);
			dsm.PersonalAnnouncement ldsmPersonalAnnouncement = dsm.PersonalAnnouncementDAO.createPersonalAnnouncement();
			// Initialize the properties of the persistent object here
			dsm.PersonalAnnouncementDAO.save(ldsmPersonalAnnouncement);
			dsm.Register ldsmRegister = dsm.RegisterDAO.createRegister();
			// TODO Initialize the properties of the persistent object here, the following properties must be initialized before saving : payments, instructor, category
			dsm.RegisterDAO.save(ldsmRegister);
			dsm.Exam ldsmExam = dsm.ExamDAO.createExam();
			// Initialize the properties of the persistent object here
			dsm.ExamDAO.save(ldsmExam);
			dsm.Payment ldsmPayment = dsm.PaymentDAO.createPayment();
			// TODO Initialize the properties of the persistent object here, the following properties must be initialized before saving : value, secretary
			dsm.PaymentDAO.save(ldsmPayment);
			dsm.Secretary ldsmSecretary = dsm.SecretaryDAO.createSecretary();
			// Initialize the properties of the persistent object here
			dsm.SecretaryDAO.save(ldsmSecretary);
			dsm.Category ldsmCategory = dsm.CategoryDAO.createCategory();
			// TODO Initialize the properties of the persistent object here, the following properties must be initialized before saving : theoreticalLessons, practicalLessons
			dsm.CategoryDAO.save(ldsmCategory);
			dsm.Student ldsmStudent = dsm.StudentDAO.createStudent();
			// TODO Initialize the properties of the persistent object here, the following properties must be initialized before saving : registers, lessons, announcements, exams, nif
			dsm.StudentDAO.save(ldsmStudent);
			dsm.Instructor ldsmInstructor = dsm.InstructorDAO.createInstructor();
			// TODO Initialize the properties of the persistent object here, the following properties must be initialized before saving : lessons, workingDays
			dsm.InstructorDAO.save(ldsmInstructor);
			dsm.TheoreticalLesson ldsmTheoreticalLesson = dsm.TheoreticalLessonDAO.createTheoreticalLesson();
			// TODO Initialize the properties of the persistent object here, the following properties must be initialized before saving : themes
			dsm.TheoreticalLessonDAO.save(ldsmTheoreticalLesson);
			dsm.Theme ldsmTheme = dsm.ThemeDAO.createTheme();
			// Initialize the properties of the persistent object here
			dsm.ThemeDAO.save(ldsmTheme);
			t.commit();
		}
		catch (Exception e) {
			t.rollback();
		}
		
	}
	
	public static void main(String[] args) {
		try {
			CreateDSMData createDSMData = new CreateDSMData();
			try {
				createDSMData.createTestData();
			}
			finally {
				dsm.DSMPersistentManager.instance().disposePersistentManager();
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
}
