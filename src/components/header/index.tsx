import Link from '../link/Link';
import Navbar from './Navbar';
import CartButton from './CartButton';
import { getCurrentLocale } from '@/lib/getCurrentLocale';
import getTrans from '@/lib/translation';

const Header = async () => {
  const locale = await getCurrentLocale();
  const { logo, navbar } = await getTrans(locale);

  console.log("Locale in Header:", locale); // للتصحيح

  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between gap-6 lg:gap-10">
        <Link
          href={`/${locale}`}
          locale={locale} // بنستخدم locale صراحة
          className="text-primary font-semibold text-2xl"
        >
          🍕 {logo}
        </Link>
        <div className="flex items-center gap-6 flex-1 justify-end">
        <Navbar translations={navbar} />
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;