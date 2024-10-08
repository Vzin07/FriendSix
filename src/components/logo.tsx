import Image from "next/image";

interface LogoProps {
    size?:number
    title?:boolean
}
export default function Logo({size=48,title}:LogoProps) {
    return(
        <div>
            <Image alt={"logo"} src={"/logo.png"} width={0} height={0}style={{ width: '100%', height: 'auto' }} sizes="100vw"/>
            {title && (<h1>FriendSix</h1>)} 
        </div>
    )
}