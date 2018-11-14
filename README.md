# Project Name

## Screenshot
![screenshot](/screenShots/updates.png)

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

```
// New terminal at each step
npm run start
npm run build
mysql.server start THEN mysql -u root

```

## CRUD Plan

| Action        | Request       | Route            |  Purpose  |
| ------------- | -------------| ----------------| ---------------|
| Create        | POST          | /api/:projectId/updates | insert new project update record |
| Read          | GET           | /api/:projectId/updates | retrieve project updates information |
| Update        | PUT           | /api/:projectId/updates | update an existing project updates |
| Delete        | DELETE        | /api/:projectId/updates | delete a project update |


### GET REQUESTS

- req.body requirements: None
- req.params requirements: projectId
- Response: UpdatesData

### POST REQUESTS

- req.body requirements: ['projectId'(id), 'postedBy'(id), title', 'body', 'likes', 'pubDate']
- Response: None

### PUT REQUESTS

- req.param requirements: projectId
- req.body requirements: ['projectId'(id), 'postedBy'(id), title', 'body', 'likes', 'pubDate']
- Response: None

### DELETE REQUESTS

- req.param requirements: projectId
- Response: None


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

