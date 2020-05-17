# i-PMS
 A Quasar framework-based version of the Investment Programming and Management System for the frontend. It uses quasar v.1.0.4 and @quasar/app v1.0.5.
 
## Requirements
 
1. NPM must be installed.
2. Yarn must be installed.
3. Quasar CLI must be installed. Run `npm install @quasar/cli`

## Framework used

Quasar Framework: https://github.com/quasarframework/quasar

## Running on Dev Server

1. Open your command prompt or terminal.
2. Clone the repository `git clone https://github.com/mlab817/q-pipol`
3. Go to the newly created directory `cd q-pipol`. Note: If you changed the title of the folder, cd into that directory.
4. This repository uses Yarn as it is the recommended package manager of Quasar. To install dependencies, run `yarn install`
5. To test the app, run `quasar dev`.

## File Directory

```bash
.
+-- _config.yml
+-- _drafts
|   +-- begin-with-the-crazy-ideas.textile
|   +-- on-simplicity-in-technology.markdown
+-- _includes
|   +-- footer.html
|   +-- header.html
+-- _layouts
|   +-- default.html
|   +-- post.html
+-- _posts
|   +-- 2007-10-29-why-every-programmer-should-play-nethack.textile
|   +-- 2009-04-26-barcamp-boston-4-roundup.textile
+-- _data
|   +-- members.yml
+-- _site
+-- index.html
```
├──

## Deploying in the Live Server
1. To build the application for deployment: 
   SPA:       `quasar build spa`
   PWA:       `quasar build -m pwa`
   Mobile:    `quasar build -m cordova -T android|ios`
   Electron:  `quasar build -m electron`
   This will create a /dist folder in your directory.
2. To deploy into the server, just copy the files in the spa folder and upload them to the server.

## License

The Quasar Framework is open-source software licensed under the MIT license.

## The Investment Programming and Management System
-- --

### General Problem

In general, the problem with performing Public Investment Program (PIP) formulation and updating poor, if not lack, of data management.
How to develop a system that will provide a comprehensive Investment Programming and Management for the Investment Programming Division that would enhance the current system, manage the resources efficiently, and generate a more pertinent and statistical reports that would help the management in decision-making.
Previously, the IPD used Google Sheets to create PIP Data Entry System (DES) as the means to collect, review and store data on programs and projects of operating units of the DA. The DES is organized as follows:

1.	Each operating unit has its own folder.
2.	Each folder has several spreadsheets divided into programs (banner and regular), and projects (pipeline and ongoing).
3.	Each banner program spreadsheet is further subdivided into subprograms (MFOs) while regular program is subdivided into GASS, STO and Operations.
4.	Each worksheet within a spreadsheet contains more than 200 columns each representing a data field in the PIPOL System of the NEDA.
5.	Each row in the worksheet represents one activity within the program and one project if it is a project.
6.	To consolidate all the data coming from individual spreadsheets, the data is extracted using a script and stored in a Summary Sheet.

Counting all the individual worksheets that need to be monitored and reviewed, the total exceeds 2000. One of the problems frequently reported is poor (or even lack of, in the case of Region 12) internet connection which makes it difficult for some to use the PIP DES. Some OUs resort to downloading the Spreadsheets and uploading them once they are done. However, this introduces problems as copy-pasting data overwrites hidden columns resulting in the consolidation script breaking. This can only be tracked if the data in the consolidation sheets shows invalid data (#N/A); otherwise, the error is just overlooked. This process takes most of the time of the staff, leaving very little time for actual technical review. This experience went on from 2016 to 2018. The PIP-DES was a good solution at the beginning; however, as NEDA data requirement change, so does the PIP-DES which means editing 2000+ worksheets.

The other less obvious problem is data security. The files are being protected by whitelisting official Gmail accounts of agencies and this is manually done per folder/sheet. Sometimes, the staff forgets to lock their worksheets from editing, resulting in changing of the data past the deadline. This has caused inconsistencies in the past making it difficult to track where they came from and even if they do, it is difficult to undo the changes.

In 2019, the IPD introduced a form-based approach to updating the investment programming. The form was based on the Budget Preparation (BP) Form 202 with additional data to cover the data requirements of the NEDA. This was an attempt to link investment programming to budget preparation with the assumption that the PIP Form can be used to prepare the BP 202. The IPD also introduced Form 2 or the rating form, Form 3 or the ranking form, and Form 4 or the investment program form. This was an attempt to guide operating units to do investment programming by evaluating and prioritizing their programs and projects. The time constraint (one month) was probably a huge bottleneck. The sudden change in tool also resulted in misunderstanding esp. for those who were not able to attend the orientation. Some just chose to stick with the old PIP-DES.

The other problem is how to store the data collected from the forms. Since these are individual files in Excel, they will have to be encoded in a consolidated Excel file. The PIP Form 4 was supposed to address this making the forms easy to consolidate; however, the OUs did not follow instructions on how to fill it out making it useless.
Why not rely on NEDA’s PIP Online (PIPOL) System?

From the point of view of the NEDA PIP Secretariat, the PIPOL System helped. However, for agencies, it introduced some problems:

1.	Only official PIP focal persons can access the PIPOL System and most of the time, these are only for the Central Offices. DA has more than 50 offices contributing and submitting their PIP.
2.	The NEDA did not provide a physical form that agencies can use. The agencies must come up with their own ways to collect data.
3.	The PIPOL System does not have an export data functionality. You must request data from PIP Secretariat which in turn they will request from the ICT Office. This could take days to do and they do not provide all the data DA submitted.
4.	The PIPOL System is inaccessible once PIP formulation and updating period is over.
5.	Data migration has failed in the past. Some data were missing or even sometimes PAPs.
6.	The PIPOL System will not adjust to the needs of the agencies. The PIPOL System, contrary to its name (PIPOL), belongs to NEDA and is therefore designed for the use of the NEDA. The IPD wanted to structure its PIP such that it would show how much of the PAP is allocated for each agency (for example, how much of the Rice Program is allocated to a bureau or regional field office).
7.	The PIPOL System is mainly designed to collect, process and store projects. At the beginning, the IPD struggled with the NEDA PIP Secretariat to accept submission of programs since bulk of the PIP of the DA is allocated to programs. It took some time before the NEDA agreed and accepted the proposal. However, the project-centric form was retained.
8.	The PIPOL System itself was problematic. When the updating began last year, loading the page almost took five minutes. It took a while before they were able to fix it. Sometimes, creating and updating projects fail to be saved; forcing the staff to re-enter what they already encoded.
With this in mind, what problems do the IPMS intend to address?
•	
