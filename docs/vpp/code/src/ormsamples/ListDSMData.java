/**
 * Licensee: Hugo Oliveira(Universidade do Minho)
 * License Type: Academic
 */
package ormsamples;

import org.orm.*;
public class ListDSMData {
	private static final int ROW_COUNT = 100;
	
	public void listTestData() throws PersistentException {
		System.out.println("Listing PracticalLesson...");
		dsm.PracticalLesson[] dsmPracticalLessons = dsm.PracticalLessonDAO.listPracticalLessonByQuery(null, null);
		int length = Math.min(dsmPracticalLessons.length, ROW_COUNT);
		for (int i = 0; i < length; i++) {
			System.out.println(dsmPracticalLessons[i]);
		}
		System.out.println(length + " record(s) retrieved.");
		
		System.out.println("Listing WorkingDay...");
		dsm.WorkingDay[] dsmWorkingDays = dsm.WorkingDayDAO.listWorkingDayByQuery(null, null);
		length = Math.min(dsmWorkingDays.length, ROW_COUNT);
		for (int i = 0; i < length; i++) {
			System.out.println(dsmWorkingDays[i]);
		}
		System.out.println(length + " record(s) retrieved.");
		
		System.out.println("Listing SchoolInfo...");
		dsm.SchoolInfo[] dsmSchoolInfos = dsm.SchoolInfoDAO.listSchoolInfoByQuery(null, null);
		length = Math.min(dsmSchoolInfos.length, ROW_COUNT);
		for (int i = 0; i < length; i++) {
			System.out.println(dsmSchoolInfos[i]);
		}
		System.out.println(length + " record(s) retrieved.");
		
		System.out.println("Listing Announcement...");
		dsm.Announcement[] dsmAnnouncements = dsm.AnnouncementDAO.listAnnouncementByQuery(null, null);
		length = Math.min(dsmAnnouncements.length, ROW_COUNT);
		for (int i = 0; i < length; i++) {
			System.out.println(dsmAnnouncements[i]);
		}
		System.out.println(length + " record(s) retrieved.");
		
		System.out.println("Listing PersonalAnnouncement...");
		dsm.PersonalAnnouncement[] dsmPersonalAnnouncements = dsm.PersonalAnnouncementDAO.listPersonalAnnouncementByQuery(null, null);
		length = Math.min(dsmPersonalAnnouncements.length, ROW_COUNT);
		for (int i = 0; i < length; i++) {
			System.out.println(dsmPersonalAnnouncements[i]);
		}
		System.out.println(length + " record(s) retrieved.");
		
		System.out.println("Listing Register...");
		dsm.Register[] dsmRegisters = dsm.RegisterDAO.listRegisterByQuery(null, null);
		length = Math.min(dsmRegisters.length, ROW_COUNT);
		for (int i = 0; i < length; i++) {
			System.out.println(dsmRegisters[i]);
		}
		System.out.println(length + " record(s) retrieved.");
		
		System.out.println("Listing Exam...");
		dsm.Exam[] dsmExams = dsm.ExamDAO.listExamByQuery(null, null);
		length = Math.min(dsmExams.length, ROW_COUNT);
		for (int i = 0; i < length; i++) {
			System.out.println(dsmExams[i]);
		}
		System.out.println(length + " record(s) retrieved.");
		
		System.out.println("Listing Payment...");
		dsm.Payment[] dsmPayments = dsm.PaymentDAO.listPaymentByQuery(null, null);
		length = Math.min(dsmPayments.length, ROW_COUNT);
		for (int i = 0; i < length; i++) {
			System.out.println(dsmPayments[i]);
		}
		System.out.println(length + " record(s) retrieved.");
		
		System.out.println("Listing Secretary...");
		dsm.Secretary[] dsmSecretarys = dsm.SecretaryDAO.listSecretaryByQuery(null, null);
		length = Math.min(dsmSecretarys.length, ROW_COUNT);
		for (int i = 0; i < length; i++) {
			System.out.println(dsmSecretarys[i]);
		}
		System.out.println(length + " record(s) retrieved.");
		
		System.out.println("Listing Category...");
		dsm.Category[] dsmCategorys = dsm.CategoryDAO.listCategoryByQuery(null, null);
		length = Math.min(dsmCategorys.length, ROW_COUNT);
		for (int i = 0; i < length; i++) {
			System.out.println(dsmCategorys[i]);
		}
		System.out.println(length + " record(s) retrieved.");
		
		System.out.println("Listing Student...");
		dsm.Student[] dsmStudents = dsm.StudentDAO.listStudentByQuery(null, null);
		length = Math.min(dsmStudents.length, ROW_COUNT);
		for (int i = 0; i < length; i++) {
			System.out.println(dsmStudents[i]);
		}
		System.out.println(length + " record(s) retrieved.");
		
		System.out.println("Listing Instructor...");
		dsm.Instructor[] dsmInstructors = dsm.InstructorDAO.listInstructorByQuery(null, null);
		length = Math.min(dsmInstructors.length, ROW_COUNT);
		for (int i = 0; i < length; i++) {
			System.out.println(dsmInstructors[i]);
		}
		System.out.println(length + " record(s) retrieved.");
		
		System.out.println("Listing TheoreticalLesson...");
		dsm.TheoreticalLesson[] dsmTheoreticalLessons = dsm.TheoreticalLessonDAO.listTheoreticalLessonByQuery(null, null);
		length = Math.min(dsmTheoreticalLessons.length, ROW_COUNT);
		for (int i = 0; i < length; i++) {
			System.out.println(dsmTheoreticalLessons[i]);
		}
		System.out.println(length + " record(s) retrieved.");
		
		System.out.println("Listing Theme...");
		dsm.Theme[] dsmThemes = dsm.ThemeDAO.listThemeByQuery(null, null);
		length = Math.min(dsmThemes.length, ROW_COUNT);
		for (int i = 0; i < length; i++) {
			System.out.println(dsmThemes[i]);
		}
		System.out.println(length + " record(s) retrieved.");
		
	}
	
	public void listByCriteria() throws PersistentException {
		System.out.println("Listing PracticalLesson by Criteria...");
		dsm.PracticalLessonCriteria ldsmPracticalLessonCriteria = new dsm.PracticalLessonCriteria();
		// Please uncomment the follow line and fill in parameter(s) 
		//ldsmPracticalLessonCriteria.ID.eq();
		ldsmPracticalLessonCriteria.setMaxResults(ROW_COUNT);
		dsm.PracticalLesson[] dsmPracticalLessons = ldsmPracticalLessonCriteria.listPracticalLesson();
		int length =dsmPracticalLessons== null ? 0 : Math.min(dsmPracticalLessons.length, ROW_COUNT); 
		for (int i = 0; i < length; i++) {
			 System.out.println(dsmPracticalLessons[i]);
		}
		System.out.println(length + " PracticalLesson record(s) retrieved."); 
		
		System.out.println("Listing WorkingDay by Criteria...");
		dsm.WorkingDayCriteria ldsmWorkingDayCriteria = new dsm.WorkingDayCriteria();
		// Please uncomment the follow line and fill in parameter(s) 
		//ldsmWorkingDayCriteria.ID.eq();
		ldsmWorkingDayCriteria.setMaxResults(ROW_COUNT);
		dsm.WorkingDay[] dsmWorkingDays = ldsmWorkingDayCriteria.listWorkingDay();
		length =dsmWorkingDays== null ? 0 : Math.min(dsmWorkingDays.length, ROW_COUNT); 
		for (int i = 0; i < length; i++) {
			 System.out.println(dsmWorkingDays[i]);
		}
		System.out.println(length + " WorkingDay record(s) retrieved."); 
		
		System.out.println("Listing SchoolInfo by Criteria...");
		dsm.SchoolInfoCriteria ldsmSchoolInfoCriteria = new dsm.SchoolInfoCriteria();
		// Please uncomment the follow line and fill in parameter(s) 
		//ldsmSchoolInfoCriteria.ID.eq();
		ldsmSchoolInfoCriteria.setMaxResults(ROW_COUNT);
		dsm.SchoolInfo[] dsmSchoolInfos = ldsmSchoolInfoCriteria.listSchoolInfo();
		length =dsmSchoolInfos== null ? 0 : Math.min(dsmSchoolInfos.length, ROW_COUNT); 
		for (int i = 0; i < length; i++) {
			 System.out.println(dsmSchoolInfos[i]);
		}
		System.out.println(length + " SchoolInfo record(s) retrieved."); 
		
		System.out.println("Listing Announcement by Criteria...");
		dsm.AnnouncementCriteria ldsmAnnouncementCriteria = new dsm.AnnouncementCriteria();
		// Please uncomment the follow line and fill in parameter(s) 
		//ldsmAnnouncementCriteria.ID.eq();
		ldsmAnnouncementCriteria.setMaxResults(ROW_COUNT);
		dsm.Announcement[] dsmAnnouncements = ldsmAnnouncementCriteria.listAnnouncement();
		length =dsmAnnouncements== null ? 0 : Math.min(dsmAnnouncements.length, ROW_COUNT); 
		for (int i = 0; i < length; i++) {
			 System.out.println(dsmAnnouncements[i]);
		}
		System.out.println(length + " Announcement record(s) retrieved."); 
		
		System.out.println("Listing PersonalAnnouncement by Criteria...");
		dsm.PersonalAnnouncementCriteria ldsmPersonalAnnouncementCriteria = new dsm.PersonalAnnouncementCriteria();
		// Please uncomment the follow line and fill in parameter(s) 
		//ldsmPersonalAnnouncementCriteria.ID.eq();
		ldsmPersonalAnnouncementCriteria.setMaxResults(ROW_COUNT);
		dsm.PersonalAnnouncement[] dsmPersonalAnnouncements = ldsmPersonalAnnouncementCriteria.listPersonalAnnouncement();
		length =dsmPersonalAnnouncements== null ? 0 : Math.min(dsmPersonalAnnouncements.length, ROW_COUNT); 
		for (int i = 0; i < length; i++) {
			 System.out.println(dsmPersonalAnnouncements[i]);
		}
		System.out.println(length + " PersonalAnnouncement record(s) retrieved."); 
		
		System.out.println("Listing Register by Criteria...");
		dsm.RegisterCriteria ldsmRegisterCriteria = new dsm.RegisterCriteria();
		// Please uncomment the follow line and fill in parameter(s) 
		//ldsmRegisterCriteria.ID.eq();
		ldsmRegisterCriteria.setMaxResults(ROW_COUNT);
		dsm.Register[] dsmRegisters = ldsmRegisterCriteria.listRegister();
		length =dsmRegisters== null ? 0 : Math.min(dsmRegisters.length, ROW_COUNT); 
		for (int i = 0; i < length; i++) {
			 System.out.println(dsmRegisters[i]);
		}
		System.out.println(length + " Register record(s) retrieved."); 
		
		System.out.println("Listing Exam by Criteria...");
		dsm.ExamCriteria ldsmExamCriteria = new dsm.ExamCriteria();
		// Please uncomment the follow line and fill in parameter(s) 
		//ldsmExamCriteria.ID.eq();
		ldsmExamCriteria.setMaxResults(ROW_COUNT);
		dsm.Exam[] dsmExams = ldsmExamCriteria.listExam();
		length =dsmExams== null ? 0 : Math.min(dsmExams.length, ROW_COUNT); 
		for (int i = 0; i < length; i++) {
			 System.out.println(dsmExams[i]);
		}
		System.out.println(length + " Exam record(s) retrieved."); 
		
		System.out.println("Listing Payment by Criteria...");
		dsm.PaymentCriteria ldsmPaymentCriteria = new dsm.PaymentCriteria();
		// Please uncomment the follow line and fill in parameter(s) 
		//ldsmPaymentCriteria.ID.eq();
		ldsmPaymentCriteria.setMaxResults(ROW_COUNT);
		dsm.Payment[] dsmPayments = ldsmPaymentCriteria.listPayment();
		length =dsmPayments== null ? 0 : Math.min(dsmPayments.length, ROW_COUNT); 
		for (int i = 0; i < length; i++) {
			 System.out.println(dsmPayments[i]);
		}
		System.out.println(length + " Payment record(s) retrieved."); 
		
		System.out.println("Listing Secretary by Criteria...");
		dsm.SecretaryCriteria ldsmSecretaryCriteria = new dsm.SecretaryCriteria();
		// Please uncomment the follow line and fill in parameter(s) 
		//ldsmSecretaryCriteria.ID.eq();
		ldsmSecretaryCriteria.setMaxResults(ROW_COUNT);
		dsm.Secretary[] dsmSecretarys = ldsmSecretaryCriteria.listSecretary();
		length =dsmSecretarys== null ? 0 : Math.min(dsmSecretarys.length, ROW_COUNT); 
		for (int i = 0; i < length; i++) {
			 System.out.println(dsmSecretarys[i]);
		}
		System.out.println(length + " Secretary record(s) retrieved."); 
		
		System.out.println("Listing Category by Criteria...");
		dsm.CategoryCriteria ldsmCategoryCriteria = new dsm.CategoryCriteria();
		// Please uncomment the follow line and fill in parameter(s) 
		//ldsmCategoryCriteria.ID.eq();
		ldsmCategoryCriteria.setMaxResults(ROW_COUNT);
		dsm.Category[] dsmCategorys = ldsmCategoryCriteria.listCategory();
		length =dsmCategorys== null ? 0 : Math.min(dsmCategorys.length, ROW_COUNT); 
		for (int i = 0; i < length; i++) {
			 System.out.println(dsmCategorys[i]);
		}
		System.out.println(length + " Category record(s) retrieved."); 
		
		System.out.println("Listing Student by Criteria...");
		dsm.StudentCriteria ldsmStudentCriteria = new dsm.StudentCriteria();
		// Please uncomment the follow line and fill in parameter(s) 
		//ldsmStudentCriteria.ID.eq();
		ldsmStudentCriteria.setMaxResults(ROW_COUNT);
		dsm.Student[] dsmStudents = ldsmStudentCriteria.listStudent();
		length =dsmStudents== null ? 0 : Math.min(dsmStudents.length, ROW_COUNT); 
		for (int i = 0; i < length; i++) {
			 System.out.println(dsmStudents[i]);
		}
		System.out.println(length + " Student record(s) retrieved."); 
		
		System.out.println("Listing Instructor by Criteria...");
		dsm.InstructorCriteria ldsmInstructorCriteria = new dsm.InstructorCriteria();
		// Please uncomment the follow line and fill in parameter(s) 
		//ldsmInstructorCriteria.ID.eq();
		ldsmInstructorCriteria.setMaxResults(ROW_COUNT);
		dsm.Instructor[] dsmInstructors = ldsmInstructorCriteria.listInstructor();
		length =dsmInstructors== null ? 0 : Math.min(dsmInstructors.length, ROW_COUNT); 
		for (int i = 0; i < length; i++) {
			 System.out.println(dsmInstructors[i]);
		}
		System.out.println(length + " Instructor record(s) retrieved."); 
		
		System.out.println("Listing TheoreticalLesson by Criteria...");
		dsm.TheoreticalLessonCriteria ldsmTheoreticalLessonCriteria = new dsm.TheoreticalLessonCriteria();
		// Please uncomment the follow line and fill in parameter(s) 
		//ldsmTheoreticalLessonCriteria.ID.eq();
		ldsmTheoreticalLessonCriteria.setMaxResults(ROW_COUNT);
		dsm.TheoreticalLesson[] dsmTheoreticalLessons = ldsmTheoreticalLessonCriteria.listTheoreticalLesson();
		length =dsmTheoreticalLessons== null ? 0 : Math.min(dsmTheoreticalLessons.length, ROW_COUNT); 
		for (int i = 0; i < length; i++) {
			 System.out.println(dsmTheoreticalLessons[i]);
		}
		System.out.println(length + " TheoreticalLesson record(s) retrieved."); 
		
		System.out.println("Listing Theme by Criteria...");
		dsm.ThemeCriteria ldsmThemeCriteria = new dsm.ThemeCriteria();
		// Please uncomment the follow line and fill in parameter(s) 
		//ldsmThemeCriteria.ID.eq();
		ldsmThemeCriteria.setMaxResults(ROW_COUNT);
		dsm.Theme[] dsmThemes = ldsmThemeCriteria.listTheme();
		length =dsmThemes== null ? 0 : Math.min(dsmThemes.length, ROW_COUNT); 
		for (int i = 0; i < length; i++) {
			 System.out.println(dsmThemes[i]);
		}
		System.out.println(length + " Theme record(s) retrieved."); 
		
	}
	
	public static void main(String[] args) {
		try {
			ListDSMData listDSMData = new ListDSMData();
			try {
				listDSMData.listTestData();
				//listDSMData.listByCriteria();
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
