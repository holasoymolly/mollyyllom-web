import { Header } from "@/components/Header";
import { FC } from "react";
import { Main } from "./components/Main";
import { Footer } from "@/components/Footer";

export const HomePage: FC = () => {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}