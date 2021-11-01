import { useRef } from 'react';
import tetherImg from '../tether.png'
import { depositIcon, withdrawIcon } from './IconUtils'
function Content({ usdtBal, brtBal, stakeBal, stake, unstake }) {

  let borderStyling = " border-t-2 border-gray-800 text-center flex justify-around";
  let value = useRef('');
  const handleChange = (e) => {
    value = e.target.value
  }
  return (
    <div className="mt-5 flex justify-center ">
      <div className="space-y-9">
        <table>
          <thead>
            <tr className={`font-bold py-2 ${borderStyling}`}>
              <td className="w-96">Staking Balance</td>
              <td className="w-96">Reward Balance</td>
            </tr>
          </thead>
          <tbody>
            <tr className={borderStyling}>
              <td>{stakeBal} USDT</td>
              <td>{brtBal} BRT</td>
            </tr>
          </tbody>
        </table>
        <div className="opacity-90 mb-2">
          <form action="" className="mb-3" onSubmit={(e) => {
            e.preventDefault()
            let funds = value.toString()
            funds = window.web3.utils.toWei(funds, 'Ether')
            stake(funds)
          }}>
            <div style={{ borderSpacing: '0 1em' }} className="flex justify-between  p-2">
              <span className="float-left ml-14 font-bold"> Stake Tokens</span>
              <span className="float-left mr-14">Balance: {usdtBal}</span>
            </div>
            <div className="flex mb-4 h-12 text-center ">
              <input type="text" ref={value} onChange={handleChange} className="w-60 rounded border-2 border-gray-800" placeholder="Enter a number > than 0" required>
              </input>
              <div className="flex items-center px-2 bg-gray-50 rounded">
                <img src={tetherImg} alt="tether" className="w-12 rounded-3xl" />
                <p>&nbsp;
                  &nbsp;
                  &nbsp;USDT</p>
              </div>
            </div>
            <button type="submit" className="rounded-lg bg-green-500 p-2 w-full flex justify-center font-semibold text-gray-50 hover:bg-green-400">DEPOSIT<span>{depositIcon}</span></button>
          </form>
          <button type="submit" onClick={unstake} className="rounded-lg bg-red-500 p-2 w-full flex justify-center font-semibold text-gray-50 hover:bg-red-400" >WITHDRAW <span>{withdrawIcon}</span></button>
          <div className="text-blue-500 rounded-md mt-3 hover:bg-blue-400 hover:text-gray-100 font-bold text-center p-2"><span>AeroDrop</span></div>
        </div>
      </div>
    </div>
  )
}

export default Content
