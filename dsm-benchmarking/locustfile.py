from locust import HttpLocust, TaskSet, TaskSequence, task, seq_task
from dsm import host, api_token, students_info, instructors_info, secretaries_info
import datetime
import random
import json


# STUDENT
class StudentBehavior(TaskSet):

    user_token = ""

    def on_start(self):
        self.login()

    def on_stop(self):
        self.logout()

    def get_random_student(self):
        user = random.choice(students_info)
        return user

    def login(self):
        user = self.get_random_student()
        response = self.client.post(
            url="/authentication",
            data=json.dumps({
                "email": user[0],
                "password": user[1]
            }),
            headers={
                "content-type": 'application/json',
                "authorization": api_token
            }
        )
        self.user_token = response.json()['userToken']

    def logout(self):
        self.client.post(
            url="/logout",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    def random_timestamp(self):
        today = datetime.datetime.now()
        random_date = today + datetime.timedelta(days=random.randrange(7))
        print(today.strftime("%d/%m/%Y %H:%M"))
        print(random_date.strftime("%d/%m/%Y %H:%M"))
        return today.strftime("%s"), random_date.strftime("%s")

    @task(10)
    def get_recent_announcements(self):
        self.client.get(
            url="/user/announcements?filter=recent",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    @task(10)
    def get_personal_announcements(self):
        self.client.get(
            url="/student/personal_announcements",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    @task(10)
    def get_next_practical_lessons(self):
        self.client.get(
            url="/student/next_practical_lessons",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    @task(10)
    def get_next_theoretical_lessons(self):
        self.client.get(
            url="/student/next_theoretical_lessons",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    @task(3)
    def get_student_information(self):
        self.client.get(
            url="/student/information",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    @task(3)
    def get_student_registers_and_payments(self):
        self.client.get(
            url="/student/registers",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    @task(1)
    class NewLessonTask(TaskSequence):

        def random_date(self):
            today = datetime.datetime.now()
            minutes = [1, 2, 3, 4, 5, 6, 7, 8,
                       9, 10, 11, 12, 13, 14, 15,
                       16, 17, 18, 19, 2, 21, 22, 23, 24]
            random_date = today - \
                datetime.timedelta(
                    hours=random.randrange(random.choice(minutes)))
            return random_date.strftime("%d/%m/%Y %H:%M")

        @seq_task(1)
        def get_instructor_lessons_between_dates(self):
            # today, next_day = self.parent.random_timestamp()
            today = '1562007600'
            next_day = '1562526000'
            query = '?instructorID=4&startDate=' + today + '&endDate=' + next_day
            self.client.get(
                url="/lessons/instructor/between_dates" + query,
                headers={
                    "content-type": 'application/json',
                    "authorization": self.parent.user_token
                }
            )

        @seq_task(2)
        def post_new_lesson(self):
            self.client.post(
                url="/lesson/student/new",
                data=json.dumps({
                    "categoryID": random.randint(1, 15),
                    "instructorID": random.randint(4, 5),
                    "startDate": self.random_date()
                }),
                headers={
                    "content-type": 'application/json',
                    "authorization": self.parent.user_token
                }
            )

        @seq_task(3)
        def stop(self):
            self.interrupt()


class DSMStudentLocust(HttpLocust):
    weight = 5  # the weight to be choose
    task_set = StudentBehavior
    host = host  # http url for requests
    min_wait = 700  # wait time in milliseconds
    max_wait = 1200  # wait time in milliseconds


# INSTRUCTOR
class InstructorBehavior(TaskSet):

    user_token = ""

    def on_start(self):
        self.login()

    def on_stop(self):
        self.logout()

    def get_random_instructor(self):
        user = random.choice(instructors_info)
        return user

    def login(self):
        user = self.get_random_instructor()
        response = self.client.post(
            url="/authentication",
            data=json.dumps({
                "email": user[0],
                "password": user[1]
            }),
            headers={
                "content-type": 'application/json',
                "authorization": api_token
            }
        )
        self.user_token = response.json()['userToken']

    def logout(self):
        self.client.post(
            url="/logout",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    def random_date(self):
        today = datetime.datetime.now()
        minutes = [10, 20, 30, 40, 50, 60, 70, 80,
                   90, 100, 110, 120, 130, 140, 150,
                   160, 170, 180, 190, 200, 210, 220, 230]
        random_date = today + \
            datetime.timedelta(
                minutes=random.randrange(random.choice(minutes)))
        return random_date.strftime("%d/%m/%Y %H:%M")

    @task(100)
    def get_recent_announcements(self):
        self.client.get(
            url="/user/announcements?filter=recent",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    @task(100)
    def get_my_students(self):
        self.client.get(
            url="/instructor/students",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    @task(50)
    def get_my_future_practical_lessons(self):
        self.client.get(
            url="/lessons/instructor/all_lessons?state=reserved&type=practical",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    @task(50)
    def get_my_future_theoretical_lessons(self):
        self.client.get(
            url="/lessons/instructor/all_lessons?state=reserved&type=theoretical",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    @task(50)
    def get_my_opened_practical_lessons(self):
        self.client.get(
            url="/lessons/instructor/all_lessons?state=opened&type=practical",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    @task(50)
    def get_my_opened_theoretical_lessons(self):
        self.client.get(
            url="/lessons/instructor/all_lessons?state=opened&type=theoretical",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    @task(1)
    class NewLessonTask(TaskSequence):

        def random_date(self):
            today = datetime.datetime.now()
            minutes = [1, 2, 3, 4, 5, 6, 7, 8,
                       9, 10, 11, 12, 13, 14, 15,
                       16, 17, 18, 19, 2, 21, 22, 23, 24]
            random_date = today - \
                datetime.timedelta(
                    hours=random.randrange(random.choice(minutes)))
            return random_date.strftime("%d/%m/%Y %H:%M")

        @seq_task(1)
        def get_instructor_lessons_between_dates(self):
            # today, next_day = self.parent.random_timestamp()
            today = '1562007600'
            next_day = '1562526000'
            query = '?instructorID=4&startDate=' + today + '&endDate=' + next_day
            self.client.get(
                url="/lessons/instructor/between_dates" + query,
                headers={
                    "content-type": 'application/json',
                    "authorization": self.parent.user_token
                }
            )

        @seq_task(2)
        def post_new_lesson(self):
            self.client.post(
                url="/lesson/student/new",
                data=json.dumps({
                    "categoryID": random.randint(1, 15),
                    "studentID": random.randint(1, 3),
                    "startDate": self.random_date()
                }),
                headers={
                    "content-type": 'application/json',
                    "authorization": self.parent.user_token
                }
            )

        @seq_task(3)
        def stop(self):
            self.interrupt()


class DSMInstructorLocust(HttpLocust):
    weight = 1  # the weight to be choose
    task_set = InstructorBehavior
    host = host  # http url for requests
    min_wait = 1000  # wait time in milliseconds
    max_wait = 1700  # wait time in milliseconds


# SECRETARY
class SecretaryBehavior(TaskSet):

    user_token = ""

    def on_start(self):
        self.login()

    def on_stop(self):
        self.logout()

    def get_random_secretary(self):
        user = random.choice(secretaries_info)
        return user

    def login(self):
        user = self.get_random_secretary()
        response = self.client.post(
            url="/authentication",
            data=json.dumps({
                "email": user[0],
                "password": user[1]
            }),
            headers={
                "content-type": 'application/json',
                "authorization": api_token
            }
        )
        self.user_token = response.json()['userToken']

    def logout(self):
        self.client.post(
            url="/logout",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    def random_date(self):
        today = datetime.datetime.now()
        minutes = [10, 20, 30, 40, 50, 60, 70, 80,
                   90, 100, 110, 120, 130, 140, 150,
                   160, 170, 180, 190, 200, 210, 220, 230]
        random_date = today + \
            datetime.timedelta(
                minutes=random.randrange(random.choice(minutes)))
        return random_date.strftime("%Y-%m-%d %H:%M")

    @task(100)
    def get_all_students(self):
        self.client.get(
            url="/students",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    # @task(1)
    # def post_register_exame(self):
    #     self.client.post(
    #         url="/secretary/register_student_exam",
    #         data=json.dumps({
    #             "studentID": random.randint(1, 3),
    #             "startTime": self.random_date(),
    #             "description": "EXAME"
    #         }),
    #         headers={
    #             "content-type": 'application/json',
    #             "authorization": self.user_token
    #         }
    #     )

    @task(1)
    class NewLessonTask(TaskSequence):

        def random_date(self):
            today = datetime.datetime.now()
            minutes = [1, 2, 3, 4, 5, 6, 7, 8,
                       9, 10, 11, 12, 13, 14, 15,
                       16, 17, 18, 19, 2, 21, 22, 23, 24]
            random_date = today - \
                datetime.timedelta(
                    hours=random.randrange(random.choice(minutes)))
            return random_date.strftime("%d/%m/%Y %H:%M")

        @seq_task(1)
        def get_instructor_lessons_between_dates(self):
            # today, next_day = self.parent.random_timestamp()
            today = '1562007600'
            next_day = '1562526000'
            query = '?instructorID=4&startDate=' + today + '&endDate=' + next_day
            self.client.get(
                url="/lessons/instructor/between_dates" + query,
                headers={
                    "content-type": 'application/json',
                    "authorization": self.parent.user_token
                }
            )

        @seq_task(2)
        def post_new_lesson(self):
            self.client.post(
                url="/lesson/student/new",
                data=json.dumps({
                    "categoryID": random.randint(1, 15),
                    "instructorID": 4,
                    "studentID": random.randint(1, 3),
                    "startDate": self.random_date()
                }),
                headers={
                    "content-type": 'application/json',
                    "authorization": self.parent.user_token
                }
            )

        @seq_task(3)
        def stop(self):
            self.interrupt()


class DSMSecretaryLocust(HttpLocust):
    weight = 1  # the weight to be choose
    task_set = SecretaryBehavior
    host = host  # http url for requests
    min_wait = 1000  # wait time in milliseconds
    max_wait = 1700  # wait time in milliseconds
