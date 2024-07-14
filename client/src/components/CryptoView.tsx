import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchCryptoData, setSelectedCrypto } from '../redux/cryptoSlice';

const CryptoView: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, selectedCrypto, error } = useSelector((state: RootState) => state.crypto);

    useEffect(() => {
        const fetchData = () => {
            dispatch(fetchCryptoData(selectedCrypto));
        };

        fetchData();
        const interval = setInterval(fetchData, 8000);

        return () => clearInterval(interval);
    }, [dispatch, selectedCrypto]);

    const cryptos=[
        "Bitcoin",
        "Ethereum",
        "Tether",
        "BNB",
        "Solana"
    ]

    return (
        <div className='w-full px-4'>
            <h1 className='font-bold text-3xl'>Crypto Dashboard</h1>

          <div className='flex gap-4 py-4 justify-center'>
            {
                cryptos.map((button,index)=>(
                    <button key={index} onClick={() => dispatch(setSelectedCrypto(button))}
                    className={` btn border px-4 py-2 ${selectedCrypto==button ? 'btn-primary' : ''} `}
                    >{button}</button>
                ))
            }
            </div>

            {error && <p>Error: {error}</p>}
            <table className='w-full bg-[#3B3C36] text-white'>
                <thead className='bg-black '>
                    <tr >
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Market Cap</th>

                    </tr>
                </thead>
                <tbody >
                    {data.slice(0, 20).map((crypto, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td className='flex gap-4 justify-center items-center'><img src={crypto.imageUrl} alt={crypto.name} width={32} />{crypto.name}</td>
                            <td>{crypto.price}</td>
                            <td>{crypto.marketcap}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoView;
