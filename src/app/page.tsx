import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-50 w-full justify-center items-center bg-amber-300">
        <h1 className="font-roboto">เทส</h1>
        <h1 className="font-sans">เทส</h1>
        <h1 className="font-saraban">เทส</h1>
      </div>
    </>
  );
}
