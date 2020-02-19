1. Install pip
2. Install virtualenv using command 
	"pip install virtualenv"
3. Open command prompt inside the backend folder. "\unicorn-charity-club\backend" and then run thr following command
	- "virtualenv env"

4. Now open Pycharm and from Pycharm terminal run the following commands
	- then cd to the following folder "cd env\Scripts\"
	- then run "activate"
	- then cd back upto the backend folder
	- then run the command "pip install -r requirements.txt"
	- then "cd src" and run the below 3 commands
	- "python manage.py makemigrations"
	- "python manage.py migrate"
	- "cd"

5. Now from the normal command prompt terminal go to fronend\ucc_gui folder. "\unicorn-charity-club\frontend\ucc_gui"
	- run command "npm i"
	- then "npm run build"
	- then "npm start"
