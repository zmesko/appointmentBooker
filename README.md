This Spring Boot application implements an appointment booking program

<b>Main parts<br>
     &ensp;Backend (Spring Boot):</b> <br>
      &emsp;- implement a RESTful API that can create, read, update, and delete records <br>
      &emsp;- simple Spring security for admin login to access the admin page <br>
      &emsp;- store appointments, user data, and unavailable days using PostgreSQL <br>
	 
 &ensp;<b>Frontend (JavaScript, CSS)</b> <br>
<p align="center">
	<b>Home screen</b>
</p>

![screenshot_home_view](https://github.com/user-attachments/assets/617e2e15-2e48-4268-9aaa-439dc5fe80d5)

&emsp;- the client can book an appointment here <br>
&emsp;- every day has an indicator showing the booked appointments in red, thus allowing you to see how many slots are available <br>
&emsp;- the Darker Fields is unavailable therefore, booking for that day is not possible <br>
&emsp;- you can navigate between months using the 'Back' and 'Next' buttons <br>
&emsp;- there is a button for admin login

<p align="center">
	<b>Appointment booking window</b>
</p>

![screenshot_appointment_booking](https://github.com/user-attachments/assets/691483b8-95b2-4f6a-b4d4-f92c44ff6a79)


&emsp;- filling in the name and email fields is required. <br>
&emsp;- then, choose the appropriate appointment and click on it

<p align="center">
	<b>Admin login</b>
</p>

![screenshot_login](https://github.com/user-attachments/assets/949dfb56-eea7-4cad-9b78-b1df8a4cc5f2)

&emsp;- after filling in the username and password, the system will check the permissions, and only admins can log in <br>
&emsp;- the default admin credentials are <b>username: admin, password: admin</b> <br>

<p align="center">
	<b>Admin page</b>
</p>

![screenshot_admin_page](https://github.com/user-attachments/assets/44e70e5f-abcb-4dc1-9968-24aa861c291c)

&emsp;- if you open a day and click the red appointment, it will be made available <br>
&emsp;- in the view, only the login button has changed to "disabling day" button <br>
&emsp;- with this button, the disabling view opens <br>

<p align="center">
	<b>Disabling view</b>
</p>

![screenshot_admin_disablingday](https://github.com/user-attachments/assets/dba2023d-c4f7-47c6-ad29-52222ff31ee5)

&emsp;- if you click the darker(unavailable) day can make it available <br>
&emsp;- conversely, if you click an available day, you can make it unavailable <br>
