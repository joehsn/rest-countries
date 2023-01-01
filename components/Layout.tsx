import Footer from "./Footer";
import Nav from "./Nav";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <main className="relative w-full min-h-screen">
      <Nav />
      <div className="w-full px-4 mx-auto 2xl:min-h-screen lg:max-w-6xl xl:px-0">
        {children}
      </div>
      <Footer />
    </main>
  );
}
