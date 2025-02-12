"use client"

import logo from "@/../public/logo.svg"
import { Blocks, FilePenLine, Search, Settings, User } from "lucide-react"
import Image from "next/image"
import { atom, useAtom } from "jotai"
import { useEffect } from "react"
import { usePathname } from 'next/navigation'
import Link from "next/link"

// Each SwitcherIcon has an ID, on page reload ID atom is updade & context switcher refreshed
const contextAtom = atom("tracer")

function ContextSwitcherIcon({ children, id, href }: { children: React.ReactNode, id: string, href: string }) {
    const [context] = useAtom(contextAtom)

    return (
        <Link href={href}>
            <div className="flex flex-row grow h-[40px] w-full cursor-pointer">
                <div className={`absolute bg-black h-[40px] w-[4px] rounded-r ${context != id ? "hidden" : ""}`} />
                <div className="flex grow justify-center">
                    {children}
                </div>
            </div>
        </Link>
    )
}

export default function ContextSwitcher() {
    const pathname = usePathname()
    const [, setContext] = useAtom(contextAtom)
    useEffect(() => {
        const pathParts = pathname.split("/");
        if(pathParts.length > 1)
            setContext(pathParts[1])
        console.log(pathname, pathParts)
    }, [pathname, setContext])

    return (
        <div className="flex flex-col h-full bg-secondary py-3">
            <div className="flex flex-col space-y-2">
                <div className="mx-3 mb-2 p-2 bg-primary rounded">
                    <Image src={logo} alt="Logo" height={20} className="invert" />
                </div>
                <ContextSwitcherIcon id="editor" href="/editor"><FilePenLine size={30} /></ContextSwitcherIcon>
                <ContextSwitcherIcon id="workflows" href="/workflows"><Blocks size={30} /></ContextSwitcherIcon>
                <ContextSwitcherIcon id="tracer" href="/tracer"><Search size={30} /></ContextSwitcherIcon>
            </div>
            <div className="flex flex-col grow justify-end">
                <div className="flex flex-col space-y-2">
                    <User size={30} />
                    <Settings size={30} />
                </div>
            </div>
        </div>
    )
}
