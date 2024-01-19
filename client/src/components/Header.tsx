// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {Link} from "react-router-dom";
const Header = () => {
    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">Mern Hotels</Link>
                </span>
                <span className="flex space-x-2">
                    <Link to="/login"
                          className="flex bg-white items-center text-blue-800 px-3 font-bold hover:bg-gray-100 hover:text-blue-600">
                        Sign in
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default Header;