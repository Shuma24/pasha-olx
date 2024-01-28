import { ReactNode } from 'react';

export function UiPagesLayout({
  content,
  asside,
  header,
}: {
  header?: ReactNode;
  asside?: ReactNode;
  content: ReactNode;
}) {
  return (
    <div className={`min-h-screen flex flex-col bg-slate-100`}>
      {header}
      <div className='flex flex-col'>
        {asside}
        <main className='pt-10 px-5'>{content}</main>
      </div>
    </div>
  );
}
