'use client'
import { useEffect, useState } from 'react';

export default function QR() {
  const [saved, setSaved] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [groups, setGroups] = useState([]);

  // totalMoney
  const limitValue = 1000000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/allData");
        const dt = await res.json();
        const totalMoney = dt?.data[0]?.totalMoney || 0;
        if (totalMoney >= limitValue && dt.dataIs.length < 10) {
          setGroups(dt.dataIs)
          generateCodes();
        }
      } catch (error) {

      }
    }
    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, [])

  const generateCodes = () => {
    const groupData = [];

    // Мөнгөөр Сугалаа өгөх хэсэг
    fetch("/api/lot")
      .then(response => response.json())
      .then(result => {
        result.data.map(dt => {
          for (let i = 0; i < Math.min(dt.money / 25000); i++) {
            groupData.push(dt.number);
          }
        });

        removeDuplicatesAndSelectRandom(groupData)
        // setGroups(groupData);
        setSaved(true);
      })
      .catch(error => console.log('error', error));
  };

  // Сугалааг өгөгдлийн сан дээр тэмдэглэх гаргах
  function removeDuplicatesAndSelectRandom(array) {
    const uniqueValues = Array.from(new Set(array));
    const randomIndex = Math.floor(Math.random() * uniqueValues.length);
    const randomValue = uniqueValues[randomIndex];

    const filteredArray = array.filter(item => item === randomValue);
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };

    // сугалааг сонгох
    fetch("/api/update?number=" + filteredArray[0], requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  // Хандив өгөх хэсэг
  const saveMoney = () => {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    if (phoneNumber.length === 8) {
      // mongonii utgiig solino !!!
      fetch(`/api/insertData?number=${phoneNumber}&money=25000`, requestOptions)
        .then(response => response.text())
        .then(result => {
          alert("Баярлалаа.")
          window.location.reload(true);
        })
        .catch(error => {
          alert("Асуудал гарсан байна.")
          window.location.reload(true);
        });
    } else {
      alert("Утасны дугаарыг шалгана уу.")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="relative flex place-items-center">
        {saved ? (
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-500" role="alert">
            {/* <span className="font-medium">Таньд баяр хүргье.</span> Та азтан болсон байна. */}
            {groups.length > 0 && (
              <div>
                <h3>Азтангууд:</h3>
                <ul>
                  {groups.map((group, index) => (
                    <li key={index}>
                      Number: {index + 1}) {group.number}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        ) : (
          <form className="max-w-sm mx-auto">
            <label htmlFor="number-input" className="block mb-2 text-sm font-medium dark:text-white">Утасны дугаар:</label>
            <input
              type="number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              id="number-input"
              aria-describedby="helper-text-explanation"
              className="z-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="XXXXXXXX"
              required
            />
            <button
              type="button"
              onClick={saveMoney}
              className="w-full mt-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              ХАДГАЛАХ
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
