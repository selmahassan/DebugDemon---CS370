# Team DebugDemon

CS 370-3 Team Debug Demon's Repo
**Team Members:** Kathy Ning, Selma Hassan, Aaron Thach, Ryan Zhao, Chau Tran, Mei Deng

## Project: SwooperMarket (Emory Buy/Sell/Giveaway)

SwooperMarket is an application that allows Emory students, faculty, and staff to list things they are selling in an efficient and clean manner. Rather than looking through hundreds of messages to see if someone is selling something you want just to find out it was already sold, SwooperMarket will provide a organized user interface for buyers and sellers to make and save some money. Technologies/Frameworks used in this project include: TypeScript, React, Next.js, MUI, and Vercel.

Our front-end components are built on React and designed with the MUI component library, leveraging the power of TypeScript for a robust user interface. For the back end, Typescript is our language of choice. These components are combined with Next.js, which is a full-stack React framework that easily handles the tooling and configuration, structure, and optimization for React. The Next.js App Router project structure makes developing frontend pages, and backend API calls seamless. We deployed our project on Vercel, which is a cloud platform that allows developers like us to easily build, deploy, and scale our applications. Our Postgres database and image blob store are also hosted on Vercel, which allows us to store user and listing information while ensuring efficient and scalable data management.

## SwooperMarket Website

**Visit this link to access SwooperMarket**: [https://debug-demon-cs-370-git-main-swoopermarket.vercel.app/login](https://debug-demon-cs-370-git-main-swoopermarket.vercel.app/login)

In the event that the login verification takes a long time to complete, you can visit the website using the following test user information:

- Username: test.user@emory.edu
- Password: SwooperMarket123

## Promotional Video

[SwooperMarket Demo Video Link](https://www.youtube.com/watch?v=OlX6z_ugQhw)

The video goes over the purpose, the technical aspects, and a user demo of the SwooperMarket website.

## Directories

### swoopermarket-v2

**Description** This directory contains the main code used in our SwooperMarket project.
This project used the Next.js App Router example project from MUI as a starter template: https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts

**How to Run the Code Locally**

1. Clone directory
2. Install Node.js: https://nodejs.org/en
3. cd into the swoopermarket-v2 directory
4. Install the dependencies with the command `npm install`
5. Follow the steps to run Vercel Postgres locally: https://vercel.com/docs/storage/vercel-postgres/quickstart
6. Run `npm run dev` to start a local server and follow the prompts to view the code running in a browser.
7. See the installation.md file in the /docs directory for more detailed instructions.

### doc

**Description** This directory contains the technical and user documentation for our SwooperMarket project. Check the `doc/table-of-contents.md` file for the description of each folder and file within this directory.

### tutorials

**Description:** This directory contains the code used to follow along with various tutorials.

1. react-tic-tac-toe: https://react.dev/learn/tutorial-tic-tac-toe
2. nextjs-blog: https://nextjs.org/learn/basics/create-nextjs-app

## Presentations/Notes

- 09/18 - Project Proposal: https://docs.google.com/presentation/d/1CN1L5qzbfZ36iasnEfbnyM1ggaoaDLPaq4VrSelETxM/edit?usp=sharing
  - SwooperMarket Website Components: https://drive.google.com/file/d/1AqarFtQokeNpkvKHvDcFTvMRkKPZiOA0/view?usp=sharing
- 09/25 - Sprint Review 1: https://docs.google.com/document/d/1qOvvU3PZ2Gv04pNsHEgQhKdodr8ctFujuvNLRG04Fw4/edit?usp=sharing
- The remaining sprint reviews were presented using a team JIRA board, which displays tasks and sprint reports (e.g., velocity, sprint burndown charts, etc.)
