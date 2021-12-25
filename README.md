## Backend Instructions

- The project is builded on Nest Js, this with the idea to have an extensible and well organized service.
- in order to start the project you have 2 options:

- NOTE: in order to make the project work as a develop process, run the backend before the frontend, also, keep this service runing at PORT 8080 in your localhost

> #### If you are using Docker
>
> - open a new terminal in the root of this folder (fullstack-interview-test)
> - run the next command: "docker build -t projectname . " this command start the configuration of a production environment of Next js.
> - after the docker installation and setup, you can activate the container using: "docker run -p 8080:8080 projectname"
> - all of the swagger documentation is on "http://localhost:8080/api/"
> 

> #### If you don't want to use docker:
>
> - open a new terminal in the root of this folder (fullstack-interview-test)
> - install all the dependencies of the proyect (npm install)
> - start the development server (npm run start:dev)
> - all of the swagger documentation is on "http://localhost:8080/api/"
>

> #### Known Bugs and posible version updates:
>
> - As a nice to have, we can implement some kind of authentication in the service (bearer, jwt, etc) by default we didnt have auth.
> - for the database required, I think that the best option is Mongo db in order to have a dynamic structure database.
> - I used nest js to have a standarized and well defined service that can be expanded without affect the desing pattern of the service, keeping it clean and maintainable.
> - 
> -  
> - 
>

    
