import express, { Express, Request, Response } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { google } from 'googleapis'
import { betterSchema } from './graphQL'
import { oauth2Client } from './services/google'
import { mainDB, PORT } from './utils'
import cors from 'cors';

const app: Express = express()

const loggingMiddleware = (req: Request, res: Response, next: any) => {
  console.log(req.headers.authorization);
  next()
};

app.use( cors() );
app.use(loggingMiddleware);
app.use(
  '/graphql',
  cors(),
  (req, res) => graphqlHTTP({
    schema: betterSchema,
    graphiql: true,
    context: req.headers
  })(req, res),
);

app.get('/', (req: Request, res: Response) => {
  res.send('super + TypeScript Server')
})

const tokenses = {
  access_token: 'ya29.a0Aa4xrXMpc2GNzXSmNZareQJF701oOa727ep4HTpLBECP-9R5Tkfb3ctDcyAT20NK3TKkVL6cxieyOIBbRWC1ttrwz21ggxZ5m3JRUl4nl2PWdHsLFHnFUzGFpOWSbGce52dAL0xOsl-J3ylIDlXzlli9znE4aCgYKATASARMSFQEjDvL9LNphBgy4hvVYcwGpxqcrpA0163',
  refresh_token: '1//0c_PMj36fR6xaCgYIARAAGAwSNwF-L9Irgd4JI24zAPo7o_wCy3uIECsNgHSyRulTuOtELV-TU04UA0KRDcWeeB8dBZbci_7ROW8',
  scope: 'https://www.googleapis.com/auth/calendar',
  token_type: 'Bearer',
  expiry_date: 1666458554124
}

app.get('/ok', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  // const {tokens} = await oauth2Client.getToken(code);
  // console.log(tokens);
  // oauth2Client.setCredentials(tokenses);
  res.send(code);
});

app.get('/list', async (req: Request, res: Response) => {
  // createConnection();
  try{
    oauth2Client.setCredentials(tokenses);
  }
  catch(err){
    res.send(err)
  }

  const cal = google.calendar({version: 'v3', auth: oauth2Client});

  const calList = await cal.calendarList.list();
  let appCal;
  appCal = calList.data.items?.filter(calendar => calendar.id === 'WEB_TODO')[0];
  console.log(appCal)

  if(!appCal){
    const res = await cal.calendars.insert({
      requestBody: {
          "description": "WEB TODO APP CALENDAR",
          "summary": "WEB TODO",
      },
    });
    console.log("created calendar");
    console.log(res.data)
  }

  const ev = await cal.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',
  }).catch(err => console.log(err));
  if(ev){
    res.send(ev.data.items);
  }
});


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})

mainDB()
