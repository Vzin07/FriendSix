import Image from "next/image";

interface LogoProps {
    size?:number
    title?:boolean
}
export default function Logo({size=48,title}:LogoProps) {
    return(
        <div className="scale-75">
            <Image alt={"logo"} src={"/logo.png"} width={0} height={0}style={{ width: '100%', height: 'auto' }} sizes="100vw"/>
            {title && (<h1 className="font-sans italic "><strong>FriendSix</strong></h1>)} 
        </div>
    )
}