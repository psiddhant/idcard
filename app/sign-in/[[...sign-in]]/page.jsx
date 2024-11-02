import {SignIn, SignUp} from '@clerk/nextjs'

export default function Page() {
    return <div className={"h-full w-full flex text-center content-center items-center justify-center"}>

        <div>
            <h1 className={"text-3xl uppercase  mb-8 font-light"}>Sign in</h1>
            <SignIn/>
        </div>
    </div>
}