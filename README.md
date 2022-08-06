
# ![](https://imgur.com/aPy2J3e.png)
#### **This is the Back-end Mobile of an mobile application developed for our Fatec Graduation Work** 

## **Index**
- [Group members](#group-members)
- [Main libraries used](#main-libraries-used)
- [How to run this projetct](#how-to-run)
- [Thanks](#thanks)

## **Group members**
Since the TG (acronym for *"Graduation Work"*, in Portuguese) can be developed by groups with up to 3 members, we decided to come together to develop the application proposed in our work. Thus, our group consists of: 


|**Member name**|**Main responsibility**|
| :-: | :-: |
|[Danilo Ferreira](https://github.com/danilo-dsf)|Architect, structure and develop the application back-end|
|[Diego Ferreira](https://github.com/diegods-ferreira)|Design, architect and develop the mobile front end of the application|


## **Main libraries used**
As the entire ecosystem around this stack is quite vast, full of libraries ready to implement in our application and make use according to our objective, below are listed the main libraries we use: 


|**Library Name**|**Version**|**What it was use for?**|
| :-: | :-: | :-: |
|typescript|3.8.3|It was used so that we could work with data typing and thus avoid problems as the project grows|
|eslint|6.8.0|They were used to enforce code style and design pattern|
|prettier|2.1.2||
|typeorm|0.2.28|These libraries were used to manage the connection to all the databases used by this application|
|pg|8.4.1|Library used to manage the PostgreSQL database|
|mongodb|3.6.2|Library used to manage the MongoDB database|
|ioredis|4.17.3|Library used to manage the Redis database|
|express|4.17.1|The express library is responsible for dealing with all the requests sent by the front-end client|
|socket.io|3.1.1|The socket.io library is responsible for managing the websocket connection between the API and the front-end client and it is used in the chats module|
|bcryptjs|2.4.3|bcryptjs was used to encrypt user passwords as they are written to the database|
|nodemailer|6.4.14|Used to send emails so the users can recover their password|
|celebrate|13.0.3|This library is responsible for the data validation when the API receives a request from the client|


## **How to run this project**
1. First, you will need to install all the requirements on your computer. So you need no install **Node.js, Yarn, Insomnia (or similar), PostgreSQL, MongoDB and Redis**
1. Then, you need to clone this repository and inside of it, run the command **yarn**
1. You will also need to create the postgres database called **tg\_peguei**
1. After creating the database, we need to run the migrations to create all the tables, columns and relations by runnig the command **yarn typeorm migration:run**
1. Your project is prepared, now you can start it running the command **yarn dev:server**
1. **Optional:** We prepared a seed to populate the database with fake data, you can run it by sending a request to the address **POST http://localhost:3333/seed**
1. **That's it!** Your project is ready to receive requests from the front-end client



## **Thanks**
***Thank you so much for visiting this repository!*** 
