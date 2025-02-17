import { FaFacebook, FaInstagram } from "react-icons/fa";
import logo from "../assets/logowork.png"

const Footer = () => {
    return (
        <div>
            <footer className="px-12 divide-y bg-[#578FCA] text-white">
	<div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
		<div className="lg:w-1/3">
			<a rel="noopener noreferrer" href="#" className="flex justify-center space-x-3 lg:justify-start">
				<div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-600">
					<img src={logo} alt="" />
				</div>
				<span className="self-center text-2xl font-semibold">Work Fusion</span>
			</a>
		</div>
		<div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
			<div className="space-y-3">
				<h3 className="tracking-wide uppercase dark:text-gray-900">Product</h3>
				<ul className="space-y-1">
					<li>
						<a rel="noopener noreferrer" href="#">Features</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#">Integrations</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#">Pricing</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#">FAQ</a>
					</li>
				</ul>
			</div>
			<div className="space-y-3">
				<h3 className="tracking-wide uppercase dark:text-gray-900">Company</h3>
				<ul className="space-y-1">
					<li>
						<a rel="noopener noreferrer" href="#">Privacy</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#">Terms of Service</a>
					</li>
				</ul>
			</div>
			<div className="space-y-3">
				<h3 className="uppercase dark:text-gray-900">Developers</h3>
				<ul className="space-y-1">
					<li>
						<a rel="noopener noreferrer" href="#">Public API</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#">Documentation</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#">Guides</a>
					</li>
				</ul>
			</div>
			<div className="space-y-3">
				<div className="uppercase dark:text-gray-900">Social media</div>
				<div className="flex justify-start space-x-3">
					<a rel="noopener noreferrer" href="https://www.facebook.com/" title="Facebook" className="text-2xl flex items-center p-1">
                    <FaFacebook />
					</a>
					<a rel="noopener noreferrer" href="https://x.com/?lang=en" title="Twitter" className="flex items-center p-1">
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
							<path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
						</svg>
					</a>
					<a rel="noopener noreferrer" href="https://www.instagram.com/?hl=en" title="Instagram" className="text-2xl flex items-center p-1">
                    <FaInstagram />
					</a>
				</div>
			</div>
		</div>
	</div>
	<div className="py-6 text-sm text-center dark:text-gray-600">© {new Date().getFullYear()} Company Co. All rights reserved.</div>
</footer>
        </div>
    );
};

export default Footer;