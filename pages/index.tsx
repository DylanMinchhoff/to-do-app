import DisplayTask from '@lib/displayTask'
import DisplayOptionsPanel from '@lib/displayOptionsPanel'
import GetNewTask from '@lib/getNewTask'

import Head from 'next/head'

const TextWelcome = () : string => {
  return "Welcome";
}

export default function Home() {
  return (
    <>
      <Head>
        <title>To-do list</title>
        <meta name="description" content="Simple to do list web app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='main-container'>
          <div className='left-main-panel'>
            <DisplayOptionsPanel />
          </div>
          <div className='right-main-panel'>
            <div className='right-panel-overlay'>
              <section className='large-display'>
                <h1 className='large-display-text'>
                  {TextWelcome()}
                </h1>
              </section>
              <section className='todo-container'>
                <DisplayTask />
              </section>
              <section className='todo-text-input-container'>
                <GetNewTask />
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
