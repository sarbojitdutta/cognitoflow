
# CognitoFlow

CognitoFlow is an AI-powered tool that reviews GitHub Pull Requests automatically. Instead of only checking code for bugs, it also makes the review process more engaging by adding a gamified experience. The AI analyzes the code, provides detailed feedback directly on GitHub, and helps developers improve their code quality. At the same time, it rewards developers with Experience Points (XP) and Levels based on the quality of their code and the amount of work they contribute, making coding feel more interactive and motivating.


## Key Features

- Direct Github Integration: *Posts detailed AI feedback and bug reports as a formatted comment directly on the Pull Request*.
- Automated AI code Reviews: *Listens for GitHub PR events via webhooks and automatically reviews changed files.*
- Developer Gamification: *Earn base XP for opening PRs, bonus XP for lines of code written, and massive "Flawless" bonuses for zero-bug code. Penalties apply for buggy code!*
- Analytics Dashboard: *A sleek, dark-themed React dashboard to track your lifetime PRs, lines of code analyzed, bugs squashed, and your current RPG-style Level.*



## Tech Stack

**Client:** React(Vite), Redux, TailwindCSS

**Server:** Node.js , Express.js, MongoDB, Redis (Caching), Octokit (Github API Integration), groq AI API (code analysis)

**Language:** Javascript



## How Its Works
1.  A developer opens or updates a Pull Request on a connected GitHub repository.
2.  GitHub triggers a webhook, sending the PR payload to the CognitoFlow Express backend.
3.  The backend fetches the changed files using Octokit and sends them to the AI service.
4.  The AI analyzes the code, counts bugs, and generates feedback.
5.  The backend calculates XP earned/lost, updates the user's level in MongoDB, and posts the final review comment back to GitHub.
6.  The developer can view their updated stats and progress bar on the CognitoFlow React dashboard.


## Installation

### Prerequisites

* Node.js installed
* MongoDB Atlas account (or MongoDB Compass)
* A GitHub App created in your Developer Settings

### 1. Clone the Repository

``` bash
git clone https://github.com/sarbojitdutta/cognitoflow.git
cd cognitoflow
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
### 3. Backend Setup
``` bash
cd server
npm install
node server.js
```


    
## Environment Variables

### .env file for server

To run this project, you will need to add the following environment variables to your .env file

`REDIS_URL`

`GROQ_API_KEY`

`JWT_SECRET`

`JWT_EXPIRE`

`MONGO_URI`

`GITHUB_PRIVATE_KEY_PATH`

`GITHUB_APP_ID`

`GITHUB_CLIENT_ID`

`GITHUB_CLIENT_SECRET`

`GITHUB_WEBHOOK_SECRET`

### .env file for client

`VITE_API_URL=http://localhost:3000`

## Demo Credentials

**Username:** Demo

**Email:** demo@cognitoflow.com

**Password:** DemoPassword123!