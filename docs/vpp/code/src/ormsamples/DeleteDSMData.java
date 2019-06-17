/**
 * Licensee: João Vieira(Universidade do Minho)
 * License Type: Academic
 */
package ormsamples;

import org.orm.*;
public class DeleteDSMData {
	public void deleteTestData() throws PersistentException {
		PersistentTransaction t = dsm.DSMPersistentManager.instance().getSession().beginTransaction();
		try {
			dsm.PracticalLesson ldsmPracticalLesson = dsm.PracticalLessonDAO.loadPracticalLessonByQuery(null, null);
			// Delete the persistent object
			dsm.PracticalLessonDAO.delete(ldsmPracticalLesson);
			dsm.WorkingDay ldsmWorkingDay = dsm.WorkingDayDAO.loadWorkingDayByQuery(null, null);
			// Delete the persistent object
			dsm.WorkingDayDAO.delete(ldsmWorkingDay);
			dsm.SchoolInfo ldsmSchoolInfo = dsm.SchoolInfoDAO.loadSchoolInfoByQuery(null, null);
			// Delete the persistent object
			dsm.SchoolInfoDAO.delete(ldsmSchoolInfo);
			dsm.Announcement ldsmAnnouncement = dsm.AnnouncementDAO.loadAnnouncementByQuery(null, null);
			// Delete the persistent object
			dsm.AnnouncementDAO.delete(ldsmAnnouncement);
			dsm.PersonalAnnouncement ldsmPersonalAnnouncement = dsm.PersonalAnnouncementDAO.loadPersonalAnnouncementByQuery(null, null);
			// Delete the persistent object
			dsm.PersonalAnnouncementDAO.delete(ldsmPersonalAnnouncement);
			dsm.Register ldsmRegister = dsm.RegisterDAO.loadRegisterByQuery(null, null);
			// Delete the persistent object
			dsm.RegisterDAO.delete(ldsmRegister);
			dsm.Exam ldsmExam = dsm.ExamDAO.loadExamByQuery(null, null);
			// Delete the persistent object
			dsm.ExamDAO.delete(ldsmExam);
			dsm.Payment ldsmPayment = dsm.PaymentDAO.loadPaymentByQuery(null, null);
			// Delete the persistent object
			dsm.PaymentDAO.delete(ldsmPayment);
			dsm.Secretary ldsmSecretary = dsm.SecretaryDAO.loadSecretaryByQuery(null, null);
			// Delete the persistent object
			dsm.SecretaryDAO.delete(ldsmSecretary);
			dsm.Category ldsmCategory = dsm.CategoryDAO.loadCategoryByQuery(null, null);
			// Delete the persistent object
			dsm.CategoryDAO.delete(ldsmCategory);
			dsm.Student ldsmStudent = dsm.StudentDAO.loadStudentByQuery(null, null);
			// Delete the persistent object
			dsm.StudentDAO.delete(ldsmStudent);
			dsm.Instructor ldsmInstructor = dsm.InstructorDAO.loadInstructorByQuery(null, null);
			// Delete the persistent object
			dsm.InstructorDAO.delete(ldsmInstructor);
			dsm.TheoreticalLesson ldsmTheoreticalLesson = dsm.TheoreticalLessonDAO.loadTheoreticalLessonByQuery(null, null);
			// Delete the persistent object
			dsm.TheoreticalLessonDAO.delete(ldsmTheoreticalLesson);
			dsm.Theme ldsmTheme = dsm.ThemeDAO.loadThemeByQuery(null, null);
			// Delete the persistent object
			dsm.ThemeDAO.delete(ldsmTheme);
			t.commit();
		}
		catch (Exception e) {
			t.rollback();
		}
		
	}
	
	public static void main(String[] args) {
		try {
			DeleteDSMData deleteDSMData = new DeleteDSMData();
			try {
				deleteDSMData.deleteTestData();
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
