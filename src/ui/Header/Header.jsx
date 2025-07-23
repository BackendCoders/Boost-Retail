/** @format */
import MenuIcon from '../../assets/whitesvgicons/Menu-Thin.svg';
import AccountIcon from '../../assets/whitesvgicons/Account-Thin.svg';
import HomeIcon from '../../assets/whitesvgicons/Homeicon.svg';
import PosIcon from '../../assets/whitesvgicons/pos.svg';
import EcommerceIcon from '../../assets/whitesvgicons/Ecommerce-Thin.svg';
import ReportIcon from '../../assets/whitesvgicons/report.svg';
import SettingIcon from '../../assets/whitesvgicons/setting.svg';
import WarrantyIcon from '../../assets/whitesvgicons/warranty.svg';
import WorkshopIcon from '../../assets/whitesvgicons/workshop.svg';
import BackOfficeIcon from '../../assets/whitesvgicons/Back-Office-Thin.svg';
import { Link } from 'react-router-dom';

export default function Header({ sidebarOpen, setSidebarOpen }) {
	return (
		<header className='bg-black text-white flex items-center justify-between'>
			<div className='flex items-center gap-4'>
				<button
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className=' text-white p-4 bg-primary-base'
				>
					<img src={MenuIcon} />
				</button>
				<Link
					className='font-bold py-4 pr-2'
					to='/back-office/product'
				>
					<h1 className='text-md tracking-wide'>Back Office</h1>
				</Link>
				<div className='ml-4 flex items-center gap-4'>
					<img src={AccountIcon} />
					<div className='text-xs text-gray-200'>
						<p>User - India</p>
						<p>test@gamil.com</p>
					</div>
				</div>
			</div>

			<ul className='flex items-center gap-8 ml-4 px-4 py-4'>
				<li className='hover:bg-primary-select'>
					<Link>
						<img src={HomeIcon} />
					</Link>
				</li>
				<li>
					<Link>
						<img src={PosIcon} />
					</Link>
				</li>
				<li>
					<Link>
						<img src={EcommerceIcon} />
					</Link>
				</li>
				<li>
					<Link>
						<img src={WorkshopIcon} />
					</Link>
				</li>
				<li>
					<Link>
						<img src={WarrantyIcon} />
					</Link>
				</li>
				<li>
					<Link>
						<img src={BackOfficeIcon} />
					</Link>
				</li>
				<li>
					<Link>
						<img src={ReportIcon} />
					</Link>
				</li>
				<li>
					<Link>
						<img src={SettingIcon} />
					</Link>
				</li>
			</ul>
		</header>
	);
}
