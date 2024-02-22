'use client'
import { useEffect, useState } from 'react';

export default function qr() {
  const [save, setSave] = useState(false);
  const [number, setNumber] = useState("");
  const [money, setMoney] = useState(50000);
  const [groups, setGroups] = useState([]);

  const generateCodes = () => {
    let groupData = 0;
    // 500k s doosh bol sugalaand oroltsono deesh bol bayrlalaa geel boloo
    // qr bxaa bolison
    // 25k r 400n sugalaa awxad 
    // niit 10n sugalaa l todrono

    // fetch('/bank_API').then()
    for (let i = 0; i < Math.min(money / 25000); i++) {
      // 30%
      if (Math.random() < 0.3) {
        groupData += 50000;
        // 3%
      } else if (Math.random() < 0.03) {
        groupData += 500000;
        // 1%
      } else if (Math.random() < 0.01) {
        groupData += 5000000;
      }
    }

    setGroups(groupData);
    setSave(true)
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="relative flex place-items-center">
        {save ?
          <div className="text-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-5 00" role="alert">
            <span className="font-medium">Таньд баярлалаа.</span><br /><br />
            {number}
            {groups === 0 ? '' : `Та ${groups}-н төгрөгны азтан болсон байна.`}
          </div>
          : <form className="max-w-sm mx-auto">
            <label htmlFor="number-input" className="block mb-2 text-sm font-medium  dark:text-white">Утасны дугаар:</label>
            <input type="number" onChange={(e) => {
              setNumber(e.target.value);
            }} id="number-input" aria-describedby="helper-text-explanation" className="z-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="XXXXXXXX" required />
            <button type="button"
              onClick={generateCodes}
              className="w-full mt-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ХАДГАЛАХ</button>
          </form>}
      </div>
    </main>
  )
}