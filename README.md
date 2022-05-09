
# MedChain

**Description**

The objective is to create a blockchain solution for medical records. At the moment, it can be difficult to retrieve your own medical records from your healthcare provider
should you want to be able to go to another provider. A semi-private blockchain solution would
allow users to have their medical records encrypted on a private but decentralized blockchain
that records their medical visits and puts that access in their hands, not the medical provider.


**How to run it**

To run the application, we have to create two instances, one which runs the backend and one for the frontend.
The main backend file is ``app.py`` and is located on the ``backend`` folder. However, before we run it we need to make sure all the dependancies needed to run the application are installed on your computer. All dependancies needed are located on the ``requirements.txt`` file and you can install them through running:

``pip install -r requirements.txt``

After you have installed the required dependancies, we can run the server throught the command:

``python ./app.py`` 


Now we create another instance of the terminal where we will run the applications frontend. The files for the frontend are located in the ``medchain`` folder. The Frontend runs in ``React`` so before we run the application we need to install all dependancies required and we can do that through this command:

``npm i`` 

After dependancies are installed, we can run an instance of the frontend through the command:

``npm start`` 

This will create an instance of the application which will connect automatically with the backend instance and the application is ready to test!!

