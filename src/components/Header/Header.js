import headerLogo from "../../images/header__logo.svg";

function Header() {
	return (
		<header className="header">
			<img
				src={headerLogo}
				alt="Логотип проекта Место Россия"
				className="logo"
			/>
		</header>
	);
}

export default Header;
