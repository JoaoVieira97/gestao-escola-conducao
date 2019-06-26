from locust import HttpLocust, TaskSet, task
from dsm import host, api_token, students_info
import random
import json


class StudentBehavior(TaskSet):

    user_token = ""

    def on_start(self):
        self.login()
        print("login")

    def on_stop(self):
        # self.logout()
        print("logout")

    def get_user(self):
        user = random.choice(students_info)
        return user

    def login(self):
        user = self.get_user()
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

    @task(2)
    def get_personal_announcements(self):
        self.client.get(
            url="/student/personal_announcements",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )

    @task(1)
    def student_information(self):
        self.client.get(
            url="/student/information",
            headers={
                "content-type": 'application/json',
                "authorization": self.user_token
            }
        )


class DSMStudentLocust(HttpLocust):
    weight = 5  # the weight to be choose
    task_set = StudentBehavior
    host = host  # http url for requests
    min_wait = 500  # wait time in milliseconds
    max_wait = 1500  # wait time in milliseconds
