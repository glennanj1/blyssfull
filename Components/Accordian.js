import { useState } from 'react'

export default function AccordionBasic(props) {

  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-sm">
      <button
        className="flex items-center w-full group mb-1"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <h2 className="lg:text-2xl xl:text-4xl text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">{props.title}</h2>
        <svg className={`border-2 rounded-full border-purple-300 w-8 h-8 shrink-0 fill-current text-purple-800 ml-3 ${open && 'rotate-180'}`} viewBox="0 0 32 32">
          <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
        </svg>
      </button>
      <div className={`text-sm ${!open && 'hidden'}`}>
        {props.children}
      </div>
    </div>
  )
}
