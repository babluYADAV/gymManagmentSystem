import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 flex items-center">
            {/* Left: Title */}
            <div className="text-lg font-bold hover:underline shrink-0">
                <Link to="/" className="hover:underline">
                    Apna Zym
                </Link>
            </div>
            {/* Center: About, Services, Contact */}
            <nav className="flex-1 flex justify-center">
                <ul className="flex space-x-4 shrink-0">
                    <li>
                        <Link to="/about" className="hover:underline">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/services" className="hover:underline">
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:underline">
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
            {/* Right: Login, Sign Up */}
            <div className="flex space-x-4 shrink-0">
                <Link to="/login" className="hover:underline">
                    Login
                </Link>
                <Link to="/register" className="hover:underline">
                    Sign Up
                </Link>
            </div>
        </header>
    );
};

export default Header;
