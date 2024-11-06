import Link from "next/link";
import Header from "../Header";

interface FormProps {
  children: React.ReactNode;
  title: string;
  userName?: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  recoveryLink?: boolean;
  leftButtonText: string;
  rightButtonText: string;
  rightLink: string;
}

export default function Form({
  children,
  userName,
  title,
  handleSubmit,
  recoveryLink,
  leftButtonText,
  rightButtonText,
  rightLink,
}: FormProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header name={userName} />
      <main className="container flex flex-col mx-auto px-[20%] justify-center flex-1">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <form
          className="space-y-6 bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          {children}
          <div className="flex flex-col space-y-4">
            {recoveryLink && (
              <div className="flex flex-col items-end pb-2">
                <Link href="/recovery/password" legacyBehavior>
                  <p className="cursor-pointer select-none text-sm text-primary hover:underline">
                    Recover Password
                  </p>
                </Link>
              </div>
            )}

            <div className="flex gap-4 justify-between">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {leftButtonText}
              </button>
              <Link href={rightLink} legacyBehavior>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gray-200 text-primary font-semibold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  {rightButtonText}
                </button>
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
