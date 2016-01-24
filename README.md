# 21janExpressMongoDBproject

Create a single resource rest API with Express that's backed by Mongo. I'm leaving this pretty open to interpretation. I want you to write this from scratch, don't just copy and paste code from class or previous projects.

Create a mongo schema/model. Add a feature of Mongoose that we didn't use class, such as data validation.

Create a router for your app that performs the appropriate CRUD operation against your Mongoose schema/model:

GET - returns list of all objects

GET/:id - returns the object specified by that id

POST create a new object (should return newly created object that has db id to client)

PUT/:id updates whole object with all provided data providers

DELETE/:id delete the object specified by that id

BONUS:

Apply query parameters to the id-less GET/ that filter what gets returned - 3pts

PATCH/:id selectively updates object based on what data is passed in - 3pts

Rubric

Use of Express: 3pts

Use of Mongo: 8pts

Tests (API): 5pts

Project Organization: 4pts