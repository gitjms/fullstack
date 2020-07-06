import React from 'react'
import Statistic from './Statistic'

const Statistics = ({ store }) => {

  console.log('state: ',store)
  if (store.total > 0) {

    return (
      <div className='col-auto'>
        <table class='table table-hover'>
            <tbody>
                <tr>
                  <Statistic text='good' value={store.good} />
                </tr>
                <tr>
                  <Statistic text='neutral' value={store.ok} />
                </tr>
                <tr>
                  <Statistic text='bad' value={store.bad} />
                </tr>
                <tr>
                  <Statistic text='all' value={store.total} />
                </tr>
                <tr>
                  <Statistic text='average' value={(store.grade/store.total).toFixed(1)} />
                </tr>
                <tr>
                  <Statistic text='positive' value={ (100 * store.positives / store.total).toFixed(1) + ' %'} />
                </tr>
            </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className='col-auto'>
      No feedback given
      <br></br>
    </div>)
}

export default Statistics