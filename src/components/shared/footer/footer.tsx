import { foooterNavigationAbout } from "@/constants/navigation";

export default function Footer() {
  return (
    <footer className="px-12 bg-gray-900 w-full h-auto py-4 flex justify-between items-center border-t-neutral-600 border-t">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto md:mr-auto max-w-7xl px-6 py-8 sm:py-8 lg:px-8 lg:py-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <img className="h-7" src="/logo-harmonique.png" alt="Company name" />
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Navigation
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {foooterNavigationAbout.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-white/80 hover:text-white"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
