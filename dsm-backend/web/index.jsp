<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>DSM</title>
    <style type="text/css">
      html {
        font-family: sans-serif;
        line-height: 1.15;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      body {
        margin: 0;
      }

      body,
      html {
        width: 100%;
        height: 100%;
        background-color: #21232a;
      }

      body {
        color: #fff;
        text-align: center;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        padding: 0;
        min-height: 100%;
        -webkit-box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.8);
        box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.8);
        display: table;
        font-family: 'Open Sans', Arial, sans-serif;
      }

      .cover {
        display: table-cell;
        vertical-align: middle;
        padding: 0 20px;
      }

      a {
        color: #fff;
      }

      a:hover {
        color: #fff;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="cover">
      <h1>Driving School Management (DSM) is running!</h1>
      <div style="margin-top: 40px">
        <h3><a href="/dsm_backend/api/students">/api/students</a></h3>
        <h3><a href="/dsm_backend/api/student/registers?id=1">/api/student/registers?id=1</a></h3>
        <h3><a href="/dsm_backend/api/lessons">/api/lessons</a></h3>
        <h3><a href="/dsm_backend/api/authentication">/api/authentication</a></h3>
      </div>
    </div>
  </body>
</html>
