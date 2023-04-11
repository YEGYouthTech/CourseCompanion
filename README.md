# Course Companion

To download the project, run `git clone https://github.com/YEGYouthTech/CourseCompanion`, and then `cd CourseCompanion`.

In production, we use MongoDB Atlas, but the simplest way to run this project locally is through [Docker](https://docs.docker.com/install/). [Docker Compose](https://docs.docker.com/compose/install/) is also required as we need both a MongoDB container and a NodeJS container.

Assuming these tools are properly installed, you can start the server using the command `docker-compose up` in the root directory of the project. This will take a few minutes to build, and then it will start the server on port 3000. You can access the server at [http://localhost:3000](http://localhost:3000).

This project has been modified to work without Firebase secrets. Most functionality is available without the configuration file containing the Firebase secrets. This is not secure and should not be used in production.
