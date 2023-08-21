"use client"

import { Listbox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'

import { useState } from 'react'

interface CustomFilterProps {
    title: string;
    options: OptionProps[];
    setFilter: (value: any) => void;
}

interface OptionProps {
    title: string;
    value: string;
}

const CustomFilter = ({ title, options, setFilter }: CustomFilterProps) => {
    const [selected, setSelected] = useState(options[0]);

    return (
        <div className='w-fit'>
            <Listbox value={selected} onChange={(e) => {
                setSelected(e);
                setFilter(e.value);
            }}>
                <div className='relative w-fit z-10'>
                    <Listbox.Button className="custom-filter__btn">
                        <span className='block truncate'>
                            {selected.title}
                        </span>
                        <Image src="/chevron-up-down.svg" width={20} height={20} className='ml-4 object-contain' alt='chevron up down' />
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leaveTo='opacity-0'
                        leaveFrom='opacity-100'
                        leave='transition ease-in duration-100'>
                        <Listbox.Options className="custom-filter__options" >
                            {
                                options.map((option) => (
                                    <Listbox.Option
                                        key={option.title}
                                        value={option}
                                        className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}
                                    >
                                        {
                                            ({ selected }) => (
                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                    {option.title}
                                                </span>
                                            )
                                        }
                                    </Listbox.Option>
                                ))
                            }
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export default CustomFilter