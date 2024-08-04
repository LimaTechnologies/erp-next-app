'use client';

import {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';

import BackToMenu from '../components/menu';
import {
  Item,
  ItemStateTypes,
} from '../types/sales';

export default function Home() {
    const [estoque, setEstoque] = useState([] as Item[]);

    useEffect(() => {
        fetch('/api/estoque', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((data: Item[]) => {
                setEstoque(data.filter(e => e.state_type == ItemStateTypes.STOCKED));
                console.log(data);
            });

        return (() => { })
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between font-mono">

            <div className="flex gap-5 w-full p-4 justify-around flex-col">
                {<BackToMenu />}
                {
                    estoque.map((item) => (
                        <div className='bg-[#25272c] text-[1rem] p-5 flex gap-10'>
                            <div className='flex'>
                                <h1 className='text-[1rem]'>
                                    {item.id}: {item.supply}
                                </h1>
                            </div>
                            <h1 className='text-[1rem]'>
                                Preço: R$ {item.price}
                            </h1>
                        </div>
                    ))
                }
            </div>

            <div className='w-full p-5 flex flex-col gap-20'>

                <Link
                    href={'/administrador/adicionar-item'}
                    className='w-full p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#65d639] font-black text-black'
                >
                    Adicionar item
                </Link>
            </div>

            <div>

            </div>

        </main>
    );
}