/**
 * Licensee: João Vieira(Universidade do Minho)
 * License Type: Academic
 */
package ormsamples;

import org.orm.*;
public class RetrieveAndUpdateDSMData {
	public void retrieveAndUpdateTestData() throws PersistentException {
		PersistentTransaction t = dsm.DSMPersistentManager.instance().getSession().beginTransaction();
		try {
			dsm.PracticalLesson ldsmPracticalLesson = dsm.PracticalLessonDAO.loadPracticalLessonByQuery(null, null);
			// Update the properties of the persistent object
			dsm.PracticalLessonDAO.save(ldsmPracticalLesson);
			dsm.WorkingDay ldsmWorkingDay = dsm.WorkingDayDAO.loadWorkingDayByQuery(null, null);
			// Update the properties of the persistent object
			dsm.WorkingDayDAO.save(ldsmWorkingDay);
			dsm.SchoolInfo ldsmSchoolInfo = dsm.SchoolInfoDAO.loadSchoolInfoByQuery(null, null);
			// Update the properties of the persistent object
			dsm.SchoolInfoDAO.save(ldsmSchoolInfo);
			dsm.Announcement ldsmAnnouncement = dsm.AnnouncementDAO.loadAnnouncementByQuery(null, null);
			// Update the properties of the persistent object
			dsm.AnnouncementDAO.save(ldsmAnnouncement);
			dsm.PersonalAnnouncement ldsmPersonalAnnouncement = dsm.PersonalAnnouncementDAO.loadPersonalAnnouncementByQuery(null, null);
			// Update the properties of the persistent object
			dsm.PersonalAnnouncementDAO.save(ldsmPersonalAnnouncement);
			dsm.Register ldsmRegister = dsm.RegisterDAO.loadRegisterByQuery(null, null);
			// Update the properties of the persistent object
			dsm.RegisterDAO.save(ldsmRegister);
			dsm.Exam ldsmExam = dsm.ExamDAO.loadExamByQuery(null, null);
			// Update the properties of the persistent object
			dsm.ExamDAO.save(ldsmExam);
			dsm.Payment ldsmPayment = dsm.PaymentDAO.loadPaymentByQuery(null, null);
			// Update the properties of the persistent object
			dsm.PaymentDAO.save(ldsmPayment);
			dsm.Secretary ldsmSecretary = dsm.SecretaryDAO.loadSecretaryByQuery(null, null);
			// Update the properties of the persistent object
			dsm.SecretaryDAO.save(ldsmSecretary);
			dsm.Category ldsmCategory = dsm.CategoryDAO.loadCategoryByQuery(null, null);
			// Update the properties of the persistent object
			dsm.CategoryDAO.save(ldsmCategory);
			dsm.Student ldsmStudent = dsm.StudentDAO.loadStudentByQuery(null, null);
			// Update the properties of the persistent object
			dsm.StudentDAO.save(ldsmStudent);
			dsm.Instructor ldsmInstructor = dsm.InstructorDAO.loadInstructorByQuery(null, null);
			// Update the properties of the persistent object
			dsm.InstructorDAO.save(ldsmInstructor);
			dsm.TheoreticalLesson ldsmTheoreticalLesson = dsm.TheoreticalLessonDAO.loadTheoreticalLessonByQuery(null, null);
			// Update the properties of the persistent object
			dsm.TheoreticalLessonDAO.save(ldsmTheoreticalLesson);
			dsm.Theme ldsmTheme = dsm.ThemeDAO.loadThemeByQuery(null, null);
			// Update the properties of the persistent object
			dsm.ThemeDAO.save(ldsmTheme);
			t.commit();
		}
		catch (Exception e) {
			t.rollback();
		}
		
	}
	
	public void retrieveByCriteria() throws PersistentException {
		System.out.println("Retrieving PracticalLesson by PracticalLessonCriteria");
		dsm.PracticalLessonCriteria ldsmPracticalLessonCriteria = new dsm.PracticalLessonCriteria();
		// Please uncomment the follow line and fill in parameter(s)
		//ldsmPracticalLessonCriteria.ID.eq();
		System.out.println(ldsmPracticalLessonCriteria.uniquePracticalLesson());
		
		System.out.println("Retrieving WorkingDay by WorkingDayCriteria");
		dsm.WorkingDayCriteria ldsmWorkingDayCriteria = new dsm.WorkingDayCriteria();
		// Please uncomment the follow line and fill in parameter(s)
		//ldsmWorkingDayCriteria.ID.eq();
		System.out.println(ldsmWorkingDayCriteria.uniqueWorkingDay());
		
		System.out.println("Retrieving SchoolInfo by SchoolInfoCriteria");
		dsm.SchoolInfoCriteria ldsmSchoolInfoCriteria = new dsm.SchoolInfoCriteria();
		// Please uncomment the follow line and fill in parameter(s)
		//ldsmSchoolInfoCriteria.ID.eq();
		System.out.println(ldsmSchoolInfoCriteria.uniqueSchoolInfo());
		
		System.out.println("Retrieving Announcement by AnnouncementCriteria");
		dsm.AnnouncementCriteria ldsmAnnouncementCriteria = new dsm.AnnouncementCriteria();
		// Please uncomment the follow line and fill in parameter(s)
		//ldsmAnnouncementCriteria.ID.eq();
		System.out.println(ldsmAnnouncementCriteria.uniqueAnnouncement());
		
		System.out.println("Retrieving PersonalAnnouncement by PersonalAnnouncementCriteria");
		dsm.PersonalAnnouncementCriteria ldsmPersonalAnnouncementCriteria = new dsm.PersonalAnnouncementCriteria();
		// Please uncomment the follow line and fill in parameter(s)
		//ldsmPersonalAnnouncementCriteria.ID.eq();
		System.out.println(ldsmPersonalAnnouncementCriteria.uniquePersonalAnnouncement());
		
		System.out.println("Retrieving Register by RegisterCriteria");
		dsm.RegisterCriteria ldsmRegisterCriteria = new dsm.RegisterCriteria();
		// Please uncomment the follow line and fill in parameter(s)
		//ldsmRegisterCriteria.ID.eq();
		System.out.println(ldsmRegisterCriteria.uniqueRegister());
		
		System.out.println("Retrieving Exam by ExamCriteria");
		dsm.ExamCriteria ldsmExamCriteria = new dsm.ExamCriteria();
		// Please uncomment the follow line and fill in parameter(s)
		//ldsmExamCriteria.ID.eq();
		System.out.println(ldsmExamCriteria.uniqueExam());
		
		System.out.println("Retrieving Payment by PaymentCriteria");
		dsm.PaymentCriteria ldsmPaymentCriteria = new dsm.PaymentCriteria();
		// Please uncomment the follow line and fill in parameter(s)
		//ldsmPaymentCriteria.ID.eq();
		System.out.println(ldsmPaymentCriteria.uniquePayment());
		
		System.out.println("Retrieving Secretary by SecretaryCriteria");
		dsm.SecretaryCriteria ldsmSecretaryCriteria = new dsm.SecretaryCriteria();
		// Please uncomment the follow line and fill in parameter(s)
		//ldsmSecretaryCriteria.ID.eq();
		System.out.println(ldsmSecretaryCriteria.uniqueSecretary());
		
		System.out.println("Retrieving Category by CategoryCriteria");
		dsm.CategoryCriteria ldsmCategoryCriteria = new dsm.CategoryCriteria();
		// Please uncomment the follow line and fill in parameter(s)
		//ldsmCategoryCriteria.ID.eq();
		System.out.println(ldsmCategoryCriteria.uniqueCategory());
		
		System.out.println("Retrieving Student by StudentCriteria");
		dsm.StudentCriteria ldsmStudentCriteria = new dsm.StudentCriteria();
		// Please uncomment the follow line and fill in parameter(s)
		//ldsmStudentCriteria.ID.eq();
		System.out.println(ldsmStudentCriteria.uniqueStudent());
		
		System.out.println("Retrieving Instructor by InstructorCriteria");
		dsm.InstructorCriteria ldsmInstructorCriteria = new dsm.InstructorCriteria();
		// Please uncomment the follow line and fill in parameter(s)
		//ldsmInstructorCriteria.ID.eq();
		System.out.println(ldsmInstructorCriteria.uniqueInstructor());
		
		System.out.println("Retrieving TheoreticalLesson by TheoreticalLessonCriteria");
		dsm.TheoreticalLessonCriteria ldsmTheoreticalLessonCriteria = new dsm.TheoreticalLessonCriteria();
		// Please uncomment the follow line and fill in parameter(s)
		//ldsmTheoreticalLessonCriteria.ID.eq();
		System.out.println(ldsmTheoreticalLessonCriteria.uniqueTheoreticalLesson());
		
		System.out.println("Retrieving Theme by ThemeCriteria");
		dsm.ThemeCriteria ldsmThemeCriteria = new dsm.ThemeCriteria();
		// Please uncomment the follow line and fill in parameter(s)
		//ldsmThemeCriteria.ID.eq();
		System.out.println(ldsmThemeCriteria.uniqueTheme());
		
	}
	
	
	public static void main(String[] args) {
		try {
			RetrieveAndUpdateDSMData retrieveAndUpdateDSMData = new RetrieveAndUpdateDSMData();
			try {
				retrieveAndUpdateDSMData.retrieveAndUpdateTestData();
				//retrieveAndUpdateDSMData.retrieveByCriteria();
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
