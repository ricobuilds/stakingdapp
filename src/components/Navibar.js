import bank from '../bank.png';

function Navibar({ heading, address }) {

  return (
    <nav className='navbar shadow-md top-0 bg-gray-800 text-white flex items-center h-16 px-5 justify-between'>
      <button><img className="inline-block" src={bank} alt="icon" width="50" height="30" /> {heading}
      </button>
      <ul>
        <li>
          <small className="text-white">
            Account Number: {address ? `${address}` : 'Sign In'}
          </small>
        </li>
      </ul>

      {/* <div className="btn-group space-x-6">
        <button className="bg-yellow-300 rounded-md p-2 text-gray-800 font-bold">Registrate</button>
        <button className="bg-green-300 rounded-md p-2 text-gray-800 font-bold">Sign In</button>
      </div> */}
    </nav>
  )
}

export default Navibar;
