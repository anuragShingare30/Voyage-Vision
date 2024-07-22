import Link from "next/link";

function Navlink(){

    return (
        <div className="flex  flex-col  gap-6">
             <Link href='/ChatBot'>
                <button className="btn  btn-ghost w-full text-xl capitalize">ChatBot</button>
            </Link>
            {/* <Link href='/Chat'>
                <button className="btn btn-ghost w-full text-xl capitalize ">Chat</button>
            </Link> */}
            <Link href='/Tour'>
                <button className="btn  btn-ghost w-full text-xl capitalize">Tour</button>
            </Link>
            <Link href='/Tour/new-tour'>
            <button className="btn  btn-ghost w-full text-xl capitalize">New Tour</button>
            </Link>
            <Link href='/Profile'>
                <button className="btn  btn-ghost w-full text-xl capitalize">Profile</button>
            </Link>
           
        </div>
    );
};

export {Navlink};