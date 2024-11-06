import Link from "next/link";
import { FC } from "react";

const NotFoundPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">Página não encontrada</p>
      <Link href="/" className="text-primary hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFoundPage;
